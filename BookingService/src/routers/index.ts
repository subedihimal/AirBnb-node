import express from "express";
import pingRouter from "./ping.router";
import hotelRouter from "./booking.router";

const app = express();

app.use('/ping', pingRouter);
app.use('/bookings',hotelRouter)

export default app;