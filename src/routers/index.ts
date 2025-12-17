import express from "express";
import pingRouter from "./ping.router";
import hotelRouter from "./hotel.router";

const app = express();

app.use('/ping', pingRouter);
app.use('/hotels',hotelRouter)

export default app;
