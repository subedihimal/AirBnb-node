import express from "express";
import pingRouter from "./ping.router";
import hotelRouter from "./hotel.router";
import roomGenerationRouter from "./roomGeneration.router";


const app = express();

app.use('/ping', pingRouter);
app.use('/hotels',hotelRouter)
app.use('/room-generation', roomGenerationRouter);

export default app;
