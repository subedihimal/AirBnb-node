import { Request, Response, NextFunction } from "express";
import {  ZodType } from "zod";
import logger from "../config/logger.config";


export const validateRequestBody = (schema: ZodType)=>{
    return async (req: Request , res: Response, next: NextFunction) =>{
        try{
            logger.info("Validating Request Body");
            await schema.parseAsync(req.body);
            logger.info("Request Body Validated")
            next(); 
        }catch(error){
            logger.info("Request Body invalid")
            return res.status(400).json({
                message: "Invalid JSON Body",
                error: error,

            });
        }
    }
}

export const validaateQueryParams = (schema: ZodType)=>{
    return async (req: Request , res: Response, next: NextFunction) =>{
        try{
            await schema.parseAsync(req.query);
            console.log("Request Query Parms are valid");
            next(); 
        }catch(error){
            return res.status(400).json({
                message: "Invalid Query Params",
                error: error,
            });
        }

    }
}
