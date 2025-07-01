import { Router } from "express";
import { AuthValidation } from "../auth/auth.validation";
import validateRequest from "../../middleware/validateRequest";
import { FolderValidation } from "./folder.validation";
import { FolderController } from "./folder.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth, FolderController.createFolder);
router.get("/", auth, FolderController.getAllFolder);

export const FolderRoute = router;
