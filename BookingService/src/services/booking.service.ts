import { CreateBookingDTO } from "../dto/booking.dto";
import { confirmBooking, createBooking, createIdempotencyKey, finalizeIdempotencyKey, getIdempotencyKeyWithLock } from "../repositories/booking.repository";
import { BadRequestError, InternalSeverError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
import prisma from "../prisma/client";
import { redlock } from "../config/redis.config";
import { serverConfig } from "../config";

export async function createBookingService(createBookingDTO: CreateBookingDTO) {

    const ttl = serverConfig.LOCK_TTL;
    const bookingResource = `hotel:${createBookingDTO.hotelId}`;

    try {
        await redlock.acquire([bookingResource], ttl);

        const booking = await createBooking({
            userId: createBookingDTO.userId,
            hotelId: createBookingDTO.hotelId,
            totalGuest: createBookingDTO.totalGuests,
            bookingAmount: createBookingDTO.bookingAmount,
        });
        const idempotencyKey = generateIdempotencyKey();

        await createIdempotencyKey(idempotencyKey, booking.id);
        return {
            bookingId: booking.id,
            idempotencyKey: idempotencyKey,
        }



    } catch (err) {
        throw new InternalSeverError("Failed to acquire a lock");
    }
}

//Made a transaction
export async function confirmBookingService(idempotencyKey: string) {
    return await prisma.$transaction(async (tx) => {
        const idempotencyKeyData = await getIdempotencyKeyWithLock(tx, idempotencyKey);
        if (!idempotencyKeyData || !idempotencyKeyData.bookingId) {
            throw new NotFoundError('Idempotency Key not found');
        }
        if (idempotencyKeyData.finalized) {
            throw new BadRequestError("Idempotency Key already finilized")
        }
        const booking = await confirmBooking(tx, idempotencyKeyData.bookingId);
        await finalizeIdempotencyKey(tx, idempotencyKey);

        return booking;

    })

}