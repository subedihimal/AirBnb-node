import { Job, Worker } from 'bullmq';
import { NotificationDto } from "../dto/notification.dto"
import { Mailer_Queue } from '../queues/mailer.queue';
import { getRedisConnectionObject } from '../config/redis.config';
import { MAILER_PAYLOAD } from '../producers/email.producer';
import { renderMailTemplate } from '../templates/templates.handlers';
import { sendEmail } from '../service/mailer.service';
import logger from '../config/logger.config';

export const setupMailerWorker = () => {

    const emailProcessor = new Worker<NotificationDto>(
        Mailer_Queue,
        async (job: Job) => {

            if(job.name !== MAILER_PAYLOAD) {
                throw new Error("Invalid job name");
            }
            const payload = job.data;
            console.log(`Processing email for: ${JSON.stringify(payload)}`);

            const emailContent = await renderMailTemplate(payload.templateId, payload.params);

            await sendEmail(payload.to, payload.subject, emailContent);

            logger.info(`Email sent to ${payload.to} with subject "${payload.subject}"`);

        },
        {
            connection: getRedisConnectionObject()
        }
    )

    emailProcessor.on("failed", () => {
        console.error("Email processing failed");
    });

    emailProcessor.on("completed", () => {
        console.log("Email processing completed successfully");
    });
}