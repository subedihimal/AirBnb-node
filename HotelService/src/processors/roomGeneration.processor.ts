import { Job, Worker } from 'bullmq';
import { ROOM_GENERATION_QUEUE } from '../queues/roomGeneration.queue';
import { getRedisConnectionObject } from '../config/redis.config';
import { ROOM_GENERATION_PAYLOAD } from '../producers/roomGeneration.producer';
import logger from '../config/logger.config';
import { RoomGenerationJob } from '../dto/roomGeneration.dto';
import { generateRooms } from '../services/roomGeneration.service';

export const setupRoomGenerationWorker = () => {

    const roomGenerationProcessor = new Worker<RoomGenerationJob>(
        ROOM_GENERATION_QUEUE,
        async (job: Job) => {
            if(job.name != ROOM_GENERATION_PAYLOAD){
                throw new Error("Invalid job name");
            }
            const payload = job.data;
            console.log(`Processing room generation job with payload: ${JSON.stringify(payload)}`);

            await generateRooms(payload);

            logger.info(`Room generation job completed for hotelId: ${payload.hotelId}`);
        },
        {
            connection: getRedisConnectionObject() as any,
        }
    )

    roomGenerationProcessor.on("failed", () => {
        console.error("Room generation processing failed");
    });

    roomGenerationProcessor.on("completed", () => {
        console.log("Room generation processing completed successfully");
    });
}