import {Queue} from 'bullmq';
import { getRedisConnectionObject } from '../config/redis.config';

export const Mailer_Queue = "queue:mailer";

export const mailer_Queue = new Queue(Mailer_Queue, {
    connection: getRedisConnectionObject(),
});