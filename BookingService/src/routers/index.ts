import express from "express";
import pingRouter from "./ping.router";
import hotelRouter from "./booking.router";

const app = express();

app.use('/', pingRouter);
app.use('/bookings',hotelRouter)

export default app;