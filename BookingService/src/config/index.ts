import dotenv from "dotenv";

type ServerConfig = {
    PORT: number,
    REDIS_SERVER_URL: string
}

function loadEnv(){
    dotenv.config();
}
loadEnv();

export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 3000,
    REDIS_SERVER_URL: process.env.REDIS_SERVER_URL || 'redis://localhost:6379'   
};

