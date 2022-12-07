import { cleanEnv, str, port } from "envalid";

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ["development", "production", "test"],
        }),
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
        MONGO_HOST: str(),
        PORT: port({ default: 3000 }),
    });
}

export default validateEnv;
