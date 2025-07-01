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
  if(!userId){
    throw new AppError(404, "user not found")
  }
  const result = await Folder.find({ user: userId }).sort({ createdAt: -1 });
  return result;
};



export const FolderService = {
  createFolderService,
  getAllFoldersService,
 
};
