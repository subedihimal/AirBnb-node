import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { serverConfig } from "../src/config/index";
import { PrismaClient } from "../generated/prisma/client";
const adapter = new PrismaMariaDb({
  host: serverConfig.DB_HOST,
  user: serverConfig.DB_USER,
  password: serverConfig.DB_PASSWORD,
  database: serverConfig.DB_NAME,
  connectionLimit: 5,
});

const prismaClient = new PrismaClient({ adapter });

export default prismaClient ;