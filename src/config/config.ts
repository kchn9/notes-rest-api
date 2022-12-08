import dotenv from "dotenv";
import validateEnv from "@/utils/validateEnv";

dotenv.config();
validateEnv();

const config = {
    mongo: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
        url: process.env.MONGO_URL,
    },
    server: {
        port: process.env.PORT,
    },
};

export default config;
