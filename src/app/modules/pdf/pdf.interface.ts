import { Types } from "mongoose";

export interface IPDF {
  _id?: Types.ObjectId;
  url: string;
  user: Types.ObjectId;
  favorite?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}