import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../exceptions/ErrorResponse';
import { logger } from './logger';

export interface ITokenData {
    id: string;
}

const generateToken = async (data: ITokenData) => {
    try {
        const secret = process.env.SECRET_KEY;
        const token = jwt.sign(
            {
                data: {
                    id: data.id
                }
            },
            secret as string,
            {
                expiresIn: process.env.JWT_EXPIRE
            }
        );
        return token;
    } catch (error: unknown) {
        const { message, statusCode } = error as ErrorResponse;
        logger.info(`ERROR: Status${statusCode} - ${message}`);
    }
};

export { generateToken };
