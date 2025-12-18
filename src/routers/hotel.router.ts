import express from "express";
import { createHotelHandler, getHotelByIdHandler, getAllHotelHandler } from "../controllers/hotel.controller";
import { hotelSchema } from "../validators/hotel.validator";
import { validateRequestBody } from "../validators";

const hotelRouter = express.Router();

hotelRouter.post('/', validateRequestBody(hotelSchema),createHotelHandler);
hotelRouter.get('/',getAllHotelHandler);
hotelRouter.get('/:id',getHotelByIdHandler);

export default hotelRouter;