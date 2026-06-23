import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

/**
 * Middleware factory that validates request body, query, and params
 * against a Zod schema before passing control to the route handler.
 */
const validateRequest = (schema: z.ZodObject<any>) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors = error.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message,
                }));

                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: "Validation Error",
                    errors,
                });
                return;
            }
            next(error);
        }
    };
};

export default validateRequest;
