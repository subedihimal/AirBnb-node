import { confirmBookingService, createBookingService } from "../services/booking.service"
import { Request, Response } from "express"
import { BadRequestError } from "../utils/errors/app.error";

export const createBookingHandler = async (req: Request, res: Response)=>{
    const booking = await createBookingService(req.body);
    res.status(201).json({
        bookingId: booking.bookingId,
        idempotencyKey: booking.idempotencyKey,
    })
}
export const confirmBookingHandler = async(req:Request, res: Response)=>{
    const idempotencyKey = req.params.idempotencyKey;
    if(!idempotencyKey){
        throw new BadRequestError('Idempotency Key cant be null');
    }
    const booking = await confirmBookingService(idempotencyKey)
    res.status(200).json({
        bookingId: booking.id,
        status: booking.status,
    });
}