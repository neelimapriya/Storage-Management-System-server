import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { FolderService } from "./folder.service";
import { Request, Response } from "express";
import { createFolderSchema } from "./folder.validation";

const createFolder = catchAsync(async (req: Request, res: Response) => {
  await createFolderSchema.parseAsync(req.body);
  const payload = {
    ...req.body,
    user: req.user._id,
  };
// console.log(req.body);
  const result = await FolderService.createFolderService(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Folder created successfully",
    data: result,
  });
});

const getAllFolder=catchAsync(async(req:Request, res:Response)=>{
  const userId=req.user._id
  console.log(userId);
  const result = await FolderService.getAllFoldersService(userId)
  console.log(result);
   sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Folder retrieve successfully",
    data: result,
  });
})

export const FolderController = {
  createFolder,
  getAllFolder
};
