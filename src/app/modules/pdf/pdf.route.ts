import express from "express";
import auth from "../../middleware/auth";
import { PdfController } from "./pdf.controller";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post("/", auth, upload.single("file"), PdfController.uploadPDF);

export const PDFRoutes = router;