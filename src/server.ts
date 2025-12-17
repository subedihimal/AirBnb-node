import express from "express";
import { serverConfig } from "./config/index";
import pingRouter from "./routers/ping.router";
import { genericErrorHandler } from "./middleware/error.middleware";
import logger from './config/logger.config'
import { attachCoorelationMiddleware } from "./middleware/correlation.middleware";
import sequelize from "./db/models/sequelize";
import hotelRouter from "./routers/hotel.router";

const app = express();
const PORT = serverConfig.PORT;

//For Reading JSON Body
app.use(express.json());

//Adding CorrelaitonID to every Request
app.use(attachCoorelationMiddleware);

//Routes
//Expects JSON Body and Query Params
app.use('/ping',pingRouter);
app.use('/hotels',hotelRouter);

//Custom Error Handling Middleware
app.use(genericErrorHandler);


app.listen(PORT, async ()=>{
    console.log(`Server is running at: ${PORT}`);
    //Winston Logger
    logger.info("Server Ran At the current time", {"anything data":"This is data area"});

    await sequelize.authenticate();
    logger.info("Connection to the db established");
    logger.info('----------------------------------------');

});