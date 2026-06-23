import { Request, Response, NextFunction } from "express";

export interface ApiResponse<T = unknown> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    error?: unknown;
}

export type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>;
