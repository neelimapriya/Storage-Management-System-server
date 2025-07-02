import { Schema } from "mongoose";

export interface IFiles {
  type: "image" | "pdf";
  url:string
  user: Schema.Types.ObjectId;
    favorite: boolean;

}
