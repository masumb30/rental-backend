import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
};

export default notFoundHandler;
