import config from "@/config/config";
import errorMiddleware from "@/middleware/error.middleware";
import Controller from "@/utils/interfaces/controller.interface";
import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import loggingMiddleware from "./middleware/logger.middleware";

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeDatabaseConnection(): void {
        mongoose.connect(
            `mongodb+srv://${config.mongo.username}:${config.mongo.password}@${config.mongo.url}`
        );
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(loggingMiddleware());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use(`/api`, controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}

export default App;
