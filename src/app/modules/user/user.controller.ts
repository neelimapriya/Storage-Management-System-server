import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import bcrypt from 'bcrypt';
import config from "../../config";


const getProfile = catchAsync(async (req, res) => {
    const { email } = req.user;
    console.log(email);
    const result = await UserServices.getProfile(email);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User profile retrieved successfully',
        data: result,
    });
});

const updateProfile = catchAsync(async (req, res) => {
    const { email } = req.user;
    const payload = {...req.body};

    if (req.body.password) {
        const hashPassword =  await bcrypt.hash(req.body.password, config.bcrypt_salt_round)
        payload.password = hashPassword
    } else {
        delete payload.password
    }
    const result = await UserServices.updateProfile(email, payload);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Profile updated successfully',
        data: result,
    });
});

export const userController={
    getProfile,
    updateProfile
}