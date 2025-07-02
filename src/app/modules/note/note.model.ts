import { Schema, model } from "mongoose";
import { INote } from "./note.interface";

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    favorite: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Note = model<INote>("Note", noteSchema);
