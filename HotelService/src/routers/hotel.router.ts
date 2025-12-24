import express from "express";
import { createHotelHandler, getHotelByIdHandler, getAllHotelHandler, deleteHotelHandler } from "../controllers/hotel.controller";
import { hotelSchema } from "../validators/hotel.validator";
import { validateRequestBody } from "../validators";

const hotelRouter = express.Router();

hotelRouter.post('/', validateRequestBody(hotelSchema),createHotelHandler);
hotelRouter.get('/',getAllHotelHandler);
hotelRouter.get('/:id',getHotelByIdHandler);
hotelRouter.delete('/:id', deleteHotelHandler);

export default hotelRouter;