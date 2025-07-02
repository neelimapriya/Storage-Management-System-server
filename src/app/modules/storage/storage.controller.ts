import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import { StatusCodes } from "http-status-codes";
import { getUserStorageUsage } from "./storage.service";

export const getMyStorage = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const result = await getUserStorageUsage(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Storage usage retrieved",
    data: result,
  });
});
