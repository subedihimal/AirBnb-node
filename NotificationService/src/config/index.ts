import dotenv from "dotenv";

type ServerConfig = {
    PORT: number
    REDIS_PORT: number,
    REDIS_HOST: string,
    MAIL_USER: string,
    MAIL_PASSWORD: string
}

function loadEnv(){
    dotenv.config();
}
loadEnv();

export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 3000,
    REDIS_PORT: Number(process.env.REDIS_PORT)|| 6379,
    REDIS_HOST: process.env.REDIS_HOST || "localhost",
    MAIL_USER: process.env.MAIL_USER || " ",
    MAIL_PASSWORD: process.env.MAIL_PASSWORD || " "

};

