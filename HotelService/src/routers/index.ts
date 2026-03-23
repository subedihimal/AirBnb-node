import express from "express";
import pingRouter from "./ping.router";
import hotelRouter from "./hotel.router";
import roomGenerationRouter from "./roomGeneration.router";
import schedulerRouter from "./roomScheduler.router";
import roomRouter from "./room.router";


const app = express();

app.use('/ping', pingRouter);
app.use('/hotels',hotelRouter)
app.use('/room-generation', roomGenerationRouter);
app.use('/scheduler', schedulerRouter);
app.use('/rooms', roomRouter);

export default app;
