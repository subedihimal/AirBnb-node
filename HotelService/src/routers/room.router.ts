import express from "express";
import { getAvailableRoomsHandler, updateBookingIdToRoomsHandler } from "../controllers/room.controller";
import { validateRequestBody } from "../validators";
import { getAvailableRoomsSchema } from "../validators/room.validator";
import { updateBookingIdToRoomsSchema } from "../validators/room.validator";

const roomRouter = express.Router();

roomRouter.get('/available',validateRequestBody(getAvailableRoomsSchema), getAvailableRoomsHandler);
roomRouter.post('/update-booking-id', validateRequestBody(updateBookingIdToRoomsSchema), updateBookingIdToRoomsHandler);

export default roomRouter;