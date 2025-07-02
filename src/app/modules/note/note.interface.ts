import { Types } from "mongoose";

export interface INote {
  _id?: Types.ObjectId;
  title: string;
  content: string;
  user: Types.ObjectId;
  favorite?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
