import { success } from "zod";
import { generateRooms } from "../services/roomGeneration.service"
import { Request, Response } from "express";

export async function generateRoomHandler(req: Request, res: Response){
    const result = await generateRooms(req.body);

    res.status(200).json({
        message: "Room generation job completed successfully",
        success: true,
        data: result,
    });

}