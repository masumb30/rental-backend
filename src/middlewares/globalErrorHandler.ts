import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/AppError";
import config from "../config";

const globalErrorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = "Something went wrong!";
    let error: unknown = undefined;

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Validation Error";
        error = err.message;
    }

    // Mongoose duplicate key error
    if ((err as any).code === 11000) {
        statusCode = StatusCodes.CONFLICT;
        message = "Duplicate entry found";
        error = err.message;
    }

    // Mongoose cast error (invalid ObjectId)
    if (err.name === "CastError") {
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Invalid ID format";
        error = err.message;
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        error,
        stack: config.env === "development" ? err.stack : undefined,
    });
};

export default globalErrorHandler;
