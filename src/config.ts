import { config } from "dotenv";
config();

export const PORT = process.env.PORT;
export const CLIENT_URL = process.env.CLIENT_URL;

export const DB_PORT = process.env.DB_PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_IS_SYNC = process.env.DB_IS_SYNC;
export const NODE_ENV = process.env.NODE_ENV;
