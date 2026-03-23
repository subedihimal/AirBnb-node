import express from "express";
import { getAvailableRoomsHandler, updateBookingIdToRoomsHandler } from "../controllers/room.controller";
import { validaateQueryParams, validateRequestBody } from "../validators";
import { getAvailableRoomsSchema } from "../validators/room.validator";
import { updateBookingIdToRoomsSchema } from "../validators/room.validator";

const roomRouter = express.Router();

roomRouter.get('/available',validaateQueryParams(getAvailableRoomsSchema), getAvailableRoomsHandler);
roomRouter.put('/update-booking-id', validateRequestBody(updateBookingIdToRoomsSchema), updateBookingIdToRoomsHandler);

export default roomRouter;