import { Types } from "mongoose";

export interface IFolder {
  name: string;
  user: Types.ObjectId;
  favorite: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}