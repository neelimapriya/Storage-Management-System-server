import { Router } from "express";
import auth from "../../middleware/auth";
import { NoteController } from "./note.controller";

const router = Router();

router.post("/", auth, NoteController.createNote);
router.get("/", auth, NoteController.getAllNotes);
router.get("/favorites", auth, NoteController.getFavoriteNotes);
router.patch("/:id", auth, NoteController.updateNote);
router.delete("/:id", auth, NoteController.deleteNote);
router.patch("/:id/toggle-favorite", auth, NoteController.toggleFavoriteNote);

export const NoteRoute = router;
