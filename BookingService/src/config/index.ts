import dotenv from "dotenv";

type ServerConfig = {
    PORT: number,
    REDIS_SERVER_URL: string,
    LOCK_TTL: number,
    DB_HOST: string,
    DB_USER: string,
    DB_PASSWORD: string,
    DB_NAME:string
}

function loadEnv(){
    dotenv.config();
}
loadEnv();

export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 3000,
    REDIS_SERVER_URL: process.env.REDIS_SERVER_URL || 'redis://localhost:6379',
    LOCK_TTL: Number(process.env.LOCK_TTL) || 60000,
    DB_HOST: process.env.DATABASE_HOST || 'localhost',
    DB_NAME: process.env.DATABASE_NAME || 'airbnb_booking,service',
    DB_USER: process.env.DATABASE_USER || 'root',
    DB_PASSWORD: process.env.DATABASE_PASSWORD || 'root'


};

