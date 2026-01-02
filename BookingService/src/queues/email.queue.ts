import {Queue} from 'bullmq';
import { getRedisConnectionObject } from '../config/redis.config';

export const Mailer_Queue = "queue-mailer";

export const mailerQueue = new Queue(Mailer_Queue, {
    connection: getRedisConnectionObject(),
});
