import { createBookingService } from "../services/booking.service"
import { Request, Response } from "express"

export const createBookingHandler = async (req: Request, res: Response)=>{
    const booking = await createBookingService(req.body);
    res.status(201).json({
        bookingId: booking.bookingId,
        idempotencyKey: booking.idempotencyKey,
    })
}
