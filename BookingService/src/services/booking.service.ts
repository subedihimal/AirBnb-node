import { CreateBookingDTO } from "../dto/booking.dto";
import { confirmBooking, createBooking, createIdempotencyKey, finalizeIdempotencyKey, getIdempotencyKeyWithLock } from "../repositories/booking.repository";
import { BadRequestError, InternalSeverError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
import Prisma from "../../prisma/client";
import { redlock } from "../config/redis.config";
import { serverConfig } from "../config";
import { getAvailableRooms } from "../api/hotel.api";

export async function createBookingService(createBookingDTO: CreateBookingDTO) {

    const ttl = serverConfig.LOCK_TTL;
    const bookingResource = `hotel:${createBookingDTO.hotelId}`;

    const availableRooms = await getAvailableRooms(
        createBookingDTO.roomCategoryId,
        createBookingDTO.checkInDate,
        createBookingDTO.checkOutDate
    );

    const checkoutDate = new Date(createBookingDTO.checkOutDate);
    const checkinDate = new Date(createBookingDTO.checkInDate);
    const totalNights = Math.ceil((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 3600 * 24));

    if (availableRooms.length === 0 || availableRooms.length < totalNights) {
        throw new BadRequestError("No rooms available for the given dates");
    }

    try {
        await redlock.acquire([bookingResource], ttl);

        const booking = await createBooking({
            userId: createBookingDTO.userId,
            hotelId: createBookingDTO.hotelId,
            totalGuest: createBookingDTO.totalGuests,
            bookingAmount: createBookingDTO.bookingAmount,
            checkInDate: createBookingDTO.checkInDate,
            checkOutDate: createBookingDTO.checkOutDate,
            roomCategoryId: createBookingDTO.roomCategoryId,
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
    return await Prisma.$transaction(async (tx) => {
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