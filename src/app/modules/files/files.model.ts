import { model, Schema } from "mongoose";
import { IFiles } from "./files.interface";

const uploadFilesSchema = new Schema<IFiles>(
  {
    type: {
      type: String,
      enum: ["image", "pdf"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UploadFile = model<IFiles>("Files", uploadFilesSchema);
