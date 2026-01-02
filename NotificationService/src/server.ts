import express from "express";
import { serverConfig } from "./config/index";
import { genericErrorHandler } from "./middleware/error.middleware";
import logger from './config/logger.config'
import { attachCoorelationMiddleware } from "./middleware/correlation.middleware";
import router from "./routers"
import { setupMailerWorker } from "./processors/email.processor";
import { NotificationDto } from "./dto/notification.dto";
import { addEmailToQueue } from "./producers/email.producer";

const app = express();
const PORT = serverConfig.PORT;

//For Reading JSON Body
app.use(express.json());

//Adding CorrelaitonID to every Request
app.use(attachCoorelationMiddleware);

//Routes
//Expects JSON Body and Query Params
app.use('/api',router);;

//Custom Error Handling Middleware
app.use(genericErrorHandler);


app.listen(PORT, ()=>{
    console.log(`Server is running at: ${PORT}`);
    //Winston Logger
    logger.info("Server Ran At the current time", {"anything data":"This is data area"});

    setupMailerWorker();
    logger.info(`Mailer worker setup completed.`);


    //Test Payload
    const sampleNotification: NotificationDto = {
        to: "simple",
        subject: "sample-templeet",
        templetId: "sample-templet",
        params:{
            name: "John Doe",
            orderId: "12345",
        }
    }
    addEmailToQueue(sampleNotification);
});