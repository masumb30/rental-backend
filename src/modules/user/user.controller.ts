import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import { AppError } from "../../utils/AppError";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createUser(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "User created successfully",
        data: result,
    });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await UserService.getUserById(id);

    if (!result) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User retrieved successfully",
        data: result,
    });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await UserService.updateUser(id, req.body);

    if (!result) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User updated successfully",
        data: result,
    });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await UserService.deleteUser(id);

    if (!result) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User deleted successfully",
        data: result,
    });
});

export const UserController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
