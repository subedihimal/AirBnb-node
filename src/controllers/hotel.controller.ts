import { Request, Response, NextFunction } from "express";
import { createHotelService } from "../services/hotel.service";
import { success } from "zod";

export async function createHotelHandler(req: Request, res: Response, next: NextFunction){
    const hotelResponse = await createHotelService(req.body);

    res.status(201).json({
        message: "Hotel Created Successfully",
        data: hotelResponse,
        success: true, 
    })

}