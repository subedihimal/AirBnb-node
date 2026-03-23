import { GetAvailableRoomsDTO } from "../dto/room.dto";
import { getAvailableRoomsService, updateBookingIdToRoomsService } from "../services/room.service";
import { Request, Response, NextFunction } from "express";

export async function getAvailableRoomsHandler(req: Request, res: Response, next: NextFunction) {

    console.log(req.query);
    const rooms = await getAvailableRoomsService({
        roomCategoryId: Number(req.query.roomCategoryId),
        checkInDate: req.query.checkInDate as string,
        checkOutDate: req.query.checkOutDate as string,
    });
    res.status(200).json({
        message: "Available rooms fetched successfully",
        data: rooms,
        success: true,
    })
}

export async function updateBookingIdToRoomsHandler(req: Request, res: Response, next: NextFunction) {
 
    const response = await updateBookingIdToRoomsService(req.body);
   

    res.status(200).json({
        message: "Booking Id updated to rooms successfully",
        data: response,
        success: true,
    })
}