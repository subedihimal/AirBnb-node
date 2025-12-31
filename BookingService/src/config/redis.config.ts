import IORedis from 'ioredis';
const Redlock = require('redlock'); 
import { serverConfig } from '.';

export const redisClient = new IORedis(serverConfig.REDIS_SERVER_URL)

export const redlock = new Redlock([redisClient],{
    driftFactor: 0.01,
    retryCount: 10,
    retryDelay: 200,
    retryJitter:200
});
