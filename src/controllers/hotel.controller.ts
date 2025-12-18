import { Request, Response, NextFunction } from "express";
import { createHotelService, getHotelByIdService, getAllHotelService } from "../services/hotel.service";
import { success } from "zod";

export async function createHotelHandler(req: Request, res: Response, next: NextFunction){
    const hotelResponse = await createHotelService(req.body);

    res.status(201).json({
        message: "Hotel Created Successfully",
        data: hotelResponse,
        success: true, 
    })

}

export async function getHotelByIdHandler(req: Request, res: Response, next: NextFunction){
    const hotelResponse = await getHotelByIdService(Number(req.params.id));

    res.status(200).json({
        message: "Hotel Found",
        data: hotelResponse,
        success: true,
    })
}

export async function getAllHotelHandler(req: Request, res: Response, next: NextFunction){
    const hotelResponse = await getAllHotelService();

    res.status(200).json({
        message:"All Hotels Found",
        data: hotelResponse,
        success: true,
    })
}


//deleteHotelHandler
//updateHotelHandler