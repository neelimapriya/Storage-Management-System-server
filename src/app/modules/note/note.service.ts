import mongoose from "mongoose";
import { Note } from "./note.model";
import AppError from "../../errors/AppError";
import { INote } from "./note.interface";

const createNoteService = async (data: INote, userId: string) => {
  const note = await Note.create({
    title: data.title,
    content: data.content,
    user: new mongoose.Types.ObjectId(userId),
    favorite: data.favorite ?? false,
  });

  return note;
};

const getAllNoteService = async (userId: string) => {
  const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
  return notes;
};

const deleteNoteService = async (id: string) => {
  const note = await Note.findByIdAndDelete(id);
  if (!note) {
    throw new AppError(404, "Note not found or already deleted");
  }
  return note;
};

const toggleFavoriteNoteService = async (id: string): Promise<INote> => {
  const note = await Note.findById(id);
  if (!note) {
    throw new AppError(404, "Note not found");
  }
  note.favorite = !note.favorite;
  await note.save();
  return note;
};

const getFavoriteNotesService = async (userId: string) => {
  const notes = await Note.find({ user: userId, favorite: true }).sort({
    createdAt: -1,
  });
  return notes;
};

const updateNoteService = async (
  id: string,
  data: Partial<INote>
): Promise<INote | null> => {
  const updated = await Note.findByIdAndUpdate(id, data, { new: true });
  if (!updated) {
    throw new AppError(404, "Note not found");
  }
  return updated;
};

export const NoteServices = {
  createNoteService,
  getAllNoteService,
  deleteNoteService,
  toggleFavoriteNoteService,
  getFavoriteNotesService,
  updateNoteService,
};
