import RoomCategory from "../db/models/roomCategory";
import { RoomGenerationJob } from "../dto/roomGeneration.dto";
import RoomCategoryRepository from "../repositories/roomCategory.repository";
import { BadRequestError } from "../utils/errors/app.error";
import RoomRepository from "../repositories/room.repository";
import Room from "../db/models/room";
import { CreationAttributes } from "sequelize";
import logger from "../config/logger.config";
import { log } from "node:console";

const roomCategoryRepository = new RoomCategoryRepository();
const roomRepository = new RoomRepository();


export async function generateRooms(jobData: RoomGenerationJob){
    //Checking if the category exist

    let totalRoomsCreated = 0;
    let totalDatesProcessed = 0;

    const roomCategory = await roomCategoryRepository.findById(jobData.roomCategoryId);
    if(!roomCategory){
        logger.error(`Room category not found ${jobData.roomCategoryId} not found`);
        throw new Error(`Room category with id ${jobData.roomCategoryId} not found`);
    }

    const startDate = new Date(jobData.startDate);
    const endDate = new Date(jobData.endDate);

    if (startDate >= endDate) {
        logger.error("Start date must be before end date");
        throw new BadRequestError("Start date must be before end date");
    }
    if (startDate < new Date()) {
        logger.error(`Start date must be in the future`);
        throw new BadRequestError(`Start date must be in the future`);
    }
    
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime())/(1000*60*60*24));
    logger.info(`Total days to process: ${totalDays}`);

    const batchSize = jobData.batchSize || 100;

    const currentDate = new Date(startDate);

    while(currentDate < endDate){
        const batchEndDate = new Date(currentDate);

        batchEndDate.setDate(batchEndDate.getDate() + batchSize - 1);
        logger.info(`Processing batch from ${currentDate.toDateString()} to ${batchEndDate.toDateString()}`);


        if(batchEndDate > endDate){
            batchEndDate.setTime(endDate.getTime());
        }

        const batchResult = await processDateBatch(roomCategory, currentDate, batchEndDate, jobData.priceOverride);
        logger.info(`Batch processed. Rooms created: ${batchResult.roomsCreated}, Dates processed: ${batchResult.datesProcessed}`);

        totalRoomsCreated += batchResult.roomsCreated;
        totalDatesProcessed += batchResult.datesProcessed;

        currentDate.setDate(batchEndDate.getTime());
    }
    return {
        totalRoomsCreated,
        totalDatesProcessed
    }

}


export async function processDateBatch(roomCategory: RoomCategory, startDate: Date, endDate: Date, priceOverride?: number){
     
    let roomsCreated = 0;
    let datesProcessed = 0;
    const roomsToCreate: CreationAttributes<Room>[] = [];

    const currentDate = new Date(startDate);
    logger.info(`Processing date batch from ${startDate.toDateString()} to ${endDate.toDateString()}`);

    //Todo: use better query to get the rooms
    while(currentDate <= endDate){
        const existingRoom = await roomRepository.findByRoomCategoryIdAndDate(roomCategory.id, currentDate);
        if(!existingRoom){
            logger.info(`No existing room found for category ${roomCategory.id} on date ${currentDate.toDateString()}. Creating new room.`);
           roomsToCreate.push({
                hotelId: roomCategory.hotelId,
                roomCategoryId: roomCategory.id,
                dateOfAvailability: new Date(currentDate),
                price: priceOverride || roomCategory.price,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
           })
           logger.info(`Room added to creation list for category ${roomCategory.id} on date ${currentDate.toDateString()}`);
        }
        currentDate.setDate(currentDate.getDate() + 1);
        datesProcessed++;
    }
    //-----------------------------------------------------

    if(roomsToCreate.length > 0){
        await roomRepository.bulkCreate(roomsToCreate);
        roomsCreated += roomsToCreate.length;
    }

    return {
        roomsCreated,
        datesProcessed
    }

}