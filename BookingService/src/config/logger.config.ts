import winston from "winston";
import { getCorrelationId } from "../utils/helpers/request.helpers";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: "DD-MM-YY HH:mm:ss" }),
        winston.format.json(),
        winston.format.printf( ({ timestamp, level, message, ...data}) =>{
            const output = { 
                correlationId: getCorrelationId(),
                timestamp,
                level,
                message,
                data 
                };
            return JSON.stringify(output);
        })
    ),
    transports:[
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: 'logs/%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            maxSize: '20m',
            maxFiles: '14d'
        }),
    ]
});
export default logger;