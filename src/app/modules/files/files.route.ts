import { Router } from "express";
import auth from "../../middleware/auth";
import { upload } from "../../utils/sendImageToCloudinary";
import validateRequest from "../../middleware/validateRequest";
import { createUploadFilesSchema } from "./files.validation";
import { FilesController } from "./files.controller";

const router = Router();

router.post(
  "/",
  auth,
  upload.single("file"),
  FilesController.uploadImage
);

router.get("/", auth, FilesController.getAllFile);
router.get("/favorites", auth, FilesController.getFavoriteFiles);
router.delete("/:id", auth, FilesController.deleteFile);
router.patch("/:id/toggle-favorite", auth, FilesController.toggleFavoriteButtonFolder);


export const FilesRoutes = router;
