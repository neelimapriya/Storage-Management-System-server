import AppError from "../../errors/AppError";
import { IFolder } from "./folder.interface";
import { Folder } from "./folder.model";

const createFolderService = async (
  payload: IFolder
): Promise<IFolder | null> => {
  const result = await Folder.create(payload);
  return result;
};

const getAllFoldersService = async (userId: string) => {
  if (!userId) {
    throw new AppError(404, "user not found");
  }
  const result = await Folder.find({ user: userId }).sort({ createdAt: -1 });
  return result;
};

const getSingleFolderService = async (id: string) => {
  const result = await Folder.findById(id);
  if (!result) {
    throw new AppError(404, "Folder not found");
  }
  return result;
};

const updateFolderService = async (
  id: string,
  data: Partial<IFolder>
): Promise<IFolder | null> => {
  const result = await Folder.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(404, "Folder not found");
  }

  return result;
};

const deleteFolderService = async (id: string) => {
  const result = await Folder.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404, "Folder not found or already deleted");
  }
  return result;
};

const toggleFavoriteButtonFolder = async (
  folderId: string
): Promise<IFolder> => {
  const folder = await Folder.findById(folderId);
  if (!folder) {
    throw new AppError(404, "Folder not found");
  }
  folder.favorite = !folder.favorite;
  await folder.save();
  return folder;
};

const getFavoriteFoldersService = async (userId: string) => {
  const result = await Folder.find({ user: userId, favorite: true }).sort({
    createdAt: -1,
  });

  return result;
};


export const FolderService = {
  createFolderService,
  getAllFoldersService,
  getSingleFolderService,
  updateFolderService,
  deleteFolderService,
  toggleFavoriteButtonFolder,
  getFavoriteFoldersService
};
