import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { PdfService } from "./pdf.service";

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

export const PdfController={
    uploadPDF
}