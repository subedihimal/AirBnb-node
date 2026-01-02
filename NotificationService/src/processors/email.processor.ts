import { Job, Worker } from 'bullmq';
import { NotificationDto } from "../dto/notification.dto"
import { Mailer_Queue } from '../queues/mailer.queue';
import { getRedisConnectionObject } from '../config/redis.config';
import { MAILER_PAYLOAD } from '../producers/email.producer';

export const setupMailerWorker = () => {
    const emailProcessor = new Worker<NotificationDto>(
        Mailer_Queue,
        async (job: Job) => {

            if (job.name !== MAILER_PAYLOAD) {
                throw new Error("Invalid job name");
            }
            //call the serviceLayer from here

            const payload = job.data;
            console.log(`Processing email for: ${JSON.stringify(payload)}`);

        },
        {
            connection: getRedisConnectionObject()
        }

    )
    emailProcessor.on("failed", () => {
        console.log("Email Processing Failed");
    });

    emailProcessor.on("completed", () => {
        console.log("Email processing Completed")
    });
}