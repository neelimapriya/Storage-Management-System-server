
import AppError from "../../errors/AppError";
import { sendPDFToCloudinary } from "../../utils/sendPdfToCloudinary";
import { IPDF } from "./pdf.interface";
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


const getAllPdfService = async (userId: string) => {
  const result = await PDF.find({ user: userId }).sort({
    createdAt: -1,
  });
  return result;
};

const deletePdfService = async (id: string) => {
  const result = await PDF.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404, "Pdf not found or already deleted");
  }
  return result;
};

const toggleFavoriteButtonPdf = async (
  pdfIdId: string
): Promise<IPDF> => {
  const pdf = await PDF.findById(pdfIdId);
  if (!pdf) {
    throw new AppError(404, "Pdf not found");
  }
  pdf.favorite = !pdf.favorite;
  await pdf.save();
  return pdf;
};

const getFavoritePdfService = async (userId: string) => {
  const result = await PDF.find({ user: userId, favorite: true }).sort({
    createdAt: -1,
  });

  return result;
};
export const PdfService={
    uploadPDFService,
    getAllPdfService,
    deletePdfService,
    toggleFavoriteButtonPdf,
    getFavoritePdfService
}


