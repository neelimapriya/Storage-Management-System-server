import { model, Schema } from "mongoose";
import { IFolder } from "./folder.interface";

 const folderSchema = new Schema<IFolder>(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    favorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Folder=model<IFolder>("Folder",folderSchema)
