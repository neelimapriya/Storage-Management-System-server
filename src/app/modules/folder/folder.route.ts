import { Router } from "express";
import { FolderController } from "./folder.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth, FolderController.createFolder);
router.get("/", auth, FolderController.getAllFolder);
router.get("/favorites", auth, FolderController.getFavoriteFolders);
router.get("/:id", auth, FolderController.getSingleFolder);
router.put("/:id", auth, FolderController.updateFolder);
router.delete("/:id", auth, FolderController.deleteFolder);
router.patch("/:id/toggle-favorite", auth, FolderController.toggleFavoriteButtonFolder);


export const FolderRoute = router;
