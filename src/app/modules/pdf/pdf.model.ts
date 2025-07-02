import { Schema, model } from "mongoose";
import { IPDF } from "./pdf.interface";

const pdfSchema = new Schema<IPDF>(
  {
    url: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
     size: { type: Number },
  },
  { timestamps: true }
);

export const PDF = model<IPDF>("PDF", pdfSchema);
