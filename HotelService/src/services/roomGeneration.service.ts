import RoomCategory from "../db/models/roomCategory";
import { RoomGenerationJob } from "../dto/roomGeneration.dto";
import RoomCategoryRepository from "../repositories/roomCategory.repository";
import { BadRequestError } from "../utils/errors/app.error";
import RoomRepository from "../repositories/room.repository";
import Room from "../db/models/room";
import { CreationAttributes } from "sequelize";

const roomCategoryRepository = new RoomCategoryRepository();
const roomRepository = new RoomRepository();


export async function generateRooms(jobData: RoomGenerationJob){
    //Checking if the category exist

    let totalRoomsCreated = 0;
    let totalDatesProcessed = 0;

    const roomCategory = await roomCategoryRepository.findById(jobData.roomCategoryId);
    if(!roomCategory){
        throw new Error(`Room category with id ${jobData.roomCategoryId} not found`);
    }

    const startDate = new Date(jobData.startDate);
    const endDate = new Date(jobData.endDate);

    if (startDate >= endDate) {
        throw new BadRequestError("Start date must be before end date");
    }
    
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime())/(1000*60*60*24));

    const batchSize = jobData.batchSize || 100;

    const currentDate = new Date(startDate);

    while(currentDate <= endDate){
        const batchEndDate = new Date(currentDate);
        batchEndDate.setDate(batchEndDate.getDate() + batchSize - 1);

        if(batchEndDate > endDate){
            batchEndDate.setTime(endDate.getTime());
        }

        const batchResult = await processDateBatch(roomCategory, currentDate, batchEndDate, jobData.priceOverride);

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

    //Todo: use better query to get the rooms
    while(currentDate <= endDate){
        const existingRoom = await roomRepository.findByRoomCategoryIdAndDate(roomCategory.id, currentDate);
        if(!existingRoom){
           roomsToCreate.push({
                hotelId: roomCategory.hotelId,
                roomCategoryId: roomCategory.id,
                dateOfAvailability: currentDate,
                price: priceOverride || roomCategory.price
           })
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