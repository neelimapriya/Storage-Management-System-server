import express from "express";
import auth from "../../middleware/auth";
import { PdfController } from "./pdf.controller";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post("/", auth, upload.single("file"), PdfController.uploadPDF);
router.get("/", auth, PdfController.getAllPdf);
router.get("/favorites", auth, PdfController.getFavoritePdf);
router.delete("/:id", auth, PdfController.deletePdf);
router.patch("/:id/toggle-favorite", auth, PdfController.toggleFavoriteButtonPdf);

export const PDFRoutes = router;