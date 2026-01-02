import IORedis, {Redis} from 'ioredis';
import Redlock from 'redlock';
import { serverConfig } from '.';

//export const redisClient = new IORedis(serverConfig.REDIS_SERVER_URL);

function connectToRedis() {
    try {
        let connection: Redis;

        
        return () => {
            if (!connection) {
                connection = new IORedis(serverConfig.REDIS_SERVER_URL);
                return connection;
            }
            return connection;
        }
    }
    catch (err) {
        console.error("Error while connecting to redis", err);
        throw err;
    }
}
export const getRedisConnectionObject = connectToRedis();

export const redlock = new Redlock([getRedisConnectionObject()],{
    driftFactor: 0.01,
    retryCount: 10,
    retryDelay: 200,
    retryJitter:200
});
