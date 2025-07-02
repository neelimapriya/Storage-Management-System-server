
import { sendPDFToCloudinary } from "../../utils/sendPdfToCloudinary";
import { PDF } from "./pdf.model";
import mongoose from "mongoose";

 const uploadPDFService = async (file: Express.Multer.File, userId: string) => {
  const publicId = `pdf_${Date.now()}`;
  const { secure_url } = await sendPDFToCloudinary(publicId, file.path);

  const result = await PDF.create({
    url: secure_url,
    user: new mongoose.Types.ObjectId(userId),
  });

  return result;
};

export const PdfService={
    uploadPDFService
}


