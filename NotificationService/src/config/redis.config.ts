import Redis from 'ioredis';
import { serverConfig } from '.';


function connectToRedis() {
    try {
        let connection: Redis;

        const redisConfig = {
            port: serverConfig.REDIS_PORT,
            HOST: serverConfig.REDIS_HOST
        }
        return () => {
            if (!connection) {
                connection = new Redis(redisConfig);
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
