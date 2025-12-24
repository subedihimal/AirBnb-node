import {Request, Response, NextFunction} from "express"
import logger from "../config/logger.config";


export const pingHandler = (req: Request,res: Response)=>{
    logger.info("Ping Request Recieved")
    res.status(200).json({
        message: "Server Working Fine",
        success: "true"
    });
}


// Error Implementation 

// import { NotFound } from "../utils/errors/app.error";
// import fs from "fs/promises"


// export const pingHandler = async(req: Request,res: Response)=>{
//     try{
//        await fs.readFile("sample");
//        res.status(200).json({message: "Test"});   
//     }catch(error: any){
//         throw new NotFound("File Not Found")
//     }
// }
