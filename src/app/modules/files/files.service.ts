import mongoose from "mongoose";
import { UploadFile } from "./files.model";
import { sendImageToTheCloudinary } from "../../utils/sendImageToCloudinary";
import AppError from "../../errors/AppError";
import { IFiles } from "./files.interface";

const uploadImageService = async (
  file: Express.Multer.File,
  userId: string
) => {
  const publicId = `file_${Date.now()}`;
  const { secure_url } = await sendImageToTheCloudinary(publicId, file.path);
  

  const result = await UploadFile.create({
    type: file.mimetype.includes("pdf") ? "pdf" : "image",
    url: secure_url,
    size: file.size,
    user: new mongoose.Types.ObjectId(userId),
  });

  return result;
};

const getAllFileService = async (userId: string) => {
  const result = await UploadFile.find({ user: userId }).sort({
    createdAt: -1,
  });
  return result;
};

const deleteFileService = async (id: string) => {
  const result = await UploadFile.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404, "Folder not found or already deleted");
  }
  return result;
};

const toggleFavoriteButtonFiles = async (
  fileIdId: string
): Promise<IFiles> => {
  const file = await UploadFile.findById(fileIdId);
  if (!file) {
    throw new AppError(404, "Folder not found");
  }
  file.favorite = !file.favorite;
  await file.save();
  return file;
};

const getFavoriteFilesService = async (userId: string) => {
  const result = await UploadFile.find({ user: userId, favorite: true }).sort({
    createdAt: -1,
  });

  return result;
};
export const FilesServices = {
  uploadImageService,
  getAllFileService,
  deleteFileService,
  toggleFavoriteButtonFiles,
  getFavoriteFilesService
};
