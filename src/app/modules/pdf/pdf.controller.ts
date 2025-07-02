import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { PdfService } from "./pdf.service";
import { IPDF } from "./pdf.interface";

 const uploadPDF = catchAsync(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const file = req.file;
  const userId = req.user._id;

  if (!file) {
    res.status(400).json({ success: false, message: "No file uploaded" });
    return;
  }

  const result = await PdfService.uploadPDFService(file, userId);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "PDF uploaded successfully",
    data: result,
  });
});

const getAllPdf = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  // console.log(userId);
  const result = await PdfService.getAllPdfService(userId);
  // console.log(result);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Pdf retrieve successfully",
    data: result,
  });
});

const deletePdf = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await PdfService.deletePdfService(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Pdf deleted successfully",
    data: null,
  });
});

const toggleFavoriteButtonPdf = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = (await PdfService.toggleFavoriteButtonPdf(
      id
    )) as IPDF;
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: `Pdf is now ${result.favorite ? "favorite" : "not favorite"}`,
      data: result,
    });
  }
);
const getFavoritePdf = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;

  const result = await PdfService.getFavoritePdfService(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Favorite PDF are retrieved successfully",
    data: result,
  });
});


export const PdfController={
    uploadPDF,
    getAllPdf,
    deletePdf,
    toggleFavoriteButtonPdf,
    getFavoritePdf
}