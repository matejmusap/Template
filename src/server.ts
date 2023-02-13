import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import { database } from './config/db';
import router from './routes';
import { ErrorResponse } from './exceptions/ErrorResponse';
import { logger } from './utils/logger';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

app.use('/api', router);

// error handler middleware
app.use((error: ErrorResponse, _request: Request, response: Response, _next: NextFunction) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Something went wrong';
    logger.info(`ERROR: Status${statusCode} - ${message}`);
    response.status(statusCode).send({
        message,
        statusCode
    });
});

const start = async () => {
    try {
        await database(`${process.env.MONGO_URI}`);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}!`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();
