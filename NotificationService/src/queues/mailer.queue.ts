import {Queue} from 'bullmq';
import { getRedisConnectionObject } from '../config/redis.config';

export const MailerQueue = "queue:mailer";

export const mailerQueue = new Queue(MailerQueue, {
    connection: getRedisConnectionObject(),
});