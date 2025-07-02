import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { FilesServices } from "./files.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { IFiles } from "./files.interface";

const uploadImage = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const file = req.file;
    const userId = req.user._id;

    if (!file) {
      res.status(400).json({ success: false, message: "No file uploaded" });
      return;
    }

    const result = await FilesServices.uploadImageService(file, userId);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "File uploaded successfully",
      data: result,
    });
  }
);

const getAllFile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  // console.log(userId);
  const result = await FilesServices.getAllFileService(userId);
  // console.log(result);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Files retrieve successfully",
    data: result,
  });
});

const deleteFile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await FilesServices.deleteFileService(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "File deleted successfully",
    data: null,
  });
});

const toggleFavoriteButtonFolder = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = (await FilesServices.toggleFavoriteButtonFiles(
      id
    )) as IFiles;
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: `file is now ${result.favorite ? "favorite" : "not favorite"}`,
      data: result,
    });
  }
);
const getFavoriteFiles = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;

  const result = await FilesServices.getFavoriteFilesService(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Favorite files retrieved successfully",
    data: result,
  });
});

export const FilesController = {
  uploadImage,
  getAllFile,
  deleteFile,
  toggleFavoriteButtonFolder,
  getFavoriteFiles,
};
