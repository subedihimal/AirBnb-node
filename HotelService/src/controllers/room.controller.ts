import { getAvailableRoomsService } from "../services/room.service";
import { Request, Response, NextFunction } from "express";

export async function getAvailableRoomsHandler(req: Request, res: Response, next: NextFunction){

    const rooms = await getAvailableRoomsService(req.body);
    res.status(200).json({
        message: "Available rooms fetched successfully",
        data: rooms,
        success: true,
    })
}