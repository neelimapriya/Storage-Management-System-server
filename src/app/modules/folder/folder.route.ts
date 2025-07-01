import { Router } from "express";
import { FolderController } from "./folder.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth, FolderController.createFolder);
router.get("/", auth, FolderController.getAllFolder);
router.get("/:id", auth, FolderController.getSingleFolder);
router.put("/:id", auth, FolderController.updateFolder);
router.delete("/:id", auth, FolderController.deleteFolder);

export const FolderRoute = router;
