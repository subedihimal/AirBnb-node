import express from "express";
import pingRouter from "./ping.router";

const app = express();

app.use('/', pingRouter);


export default app;