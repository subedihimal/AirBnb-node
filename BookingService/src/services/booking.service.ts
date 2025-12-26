import { confirmBooking, createBooking, createIdempotencyKey, finalizeIdempotencyKey, getIdempotencyKey } from "../repositories/booking.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";

export async function createBookingService(
   userId: number,
   hotelId: number,
   totalGuests: number,
   bookingAmount: number,

){
    const booking = await createBooking({
        userId,
        hotelId,
        totalGuest: totalGuests,
        bookingAmount: bookingAmount,
    });
    const idempotencyKey = generateIdempotencyKey();

    await createIdempotencyKey( idempotencyKey, booking.id);
    return{
        bookingId: booking.id,
        idempotencyKey: idempotencyKey,
    }

}
export async function finalizeBookingService(idempotencyKey: string) {
    const idempotencyKeyData = await getIdempotencyKey(idempotencyKey);
    if(!idempotencyKey){
        throw new NotFoundError('Idempotency Key not found');
    }
    if(idempotencyKeyData.finalized){
        throw new BadRequestError("Idempotency Key already finilized")
    }
    const booking = await confirmBooking(idempotencyKeyData.bookingId);
    await finalizeIdempotencyKey(idempotencyKey);
    
    return booking;
}