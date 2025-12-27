import express from "express";
import { pingHandler } from "../controllers/ping.controller";
import { validateQueryParams, validateRequestBody } from "../validators";
import { pingSchema } from "../validators/ping.validator";

const pingRouter = express.Router();

pingRouter.get('/',validateRequestBody(pingSchema),validateQueryParams(pingSchema), pingHandler);

export default pingRouter;