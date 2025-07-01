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
  // console.log(userId);
  const result = await FolderService.getAllFoldersService(userId)
  // console.log(result);
   sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Folders retrieve successfully",
    data: result,
  });
})
const getSingleFolder=catchAsync(async(req:Request, res:Response)=>{
  const {id}=req.params
  // console.log(id);
  const result = await FolderService.getSingleFolderService(id)
  console.log(result);
   sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Folder retrieve successfully",
    data: result,
  });
})

const updateFolder=catchAsync(async(req:Request, res:Response)=>{
  const {id}=req.params
  console.log(id);
  const updateFolderData=req.body
  const result= await FolderService.updateFolderService(id,updateFolderData)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Folder updated successfully",
    data: result,
  });
})

const deleteFolder=catchAsync(async(req:Request, res:Response)=>{
  const {id}=req.params
  await FolderService.deleteFolderService(id)
  sendResponse(res,{
    statusCode: StatusCodes.OK,
    success: true,
    message: "Folder deleted successfully",
    data: null,
  })
})

export const FolderController = {
  createFolder,
  getAllFolder,
  getSingleFolder,
  updateFolder,
  deleteFolder
};
