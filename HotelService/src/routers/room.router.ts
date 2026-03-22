import express from "express";
import { getAvailableRoomsHandler } from "../controllers/room.controller";
import { validateRequestBody } from "../validators";
import { getAvailableRoomsSchema } from "../validators/room.validator";

const roomRouter = express.Router();

roomRouter.get('/available',validateRequestBody(getAvailableRoomsSchema), getAvailableRoomsHandler);

export default roomRouter;