import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { NoteServices } from "./note.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createNote = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const result = await NoteServices.createNoteService(req.body, userId);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Note created successfully",
    data: result,
  });
});

const getAllNotes = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const result = await NoteServices.getAllNoteService(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Notes retrieved successfully",
    data: result,
  });
});

const getFavoriteNotes = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const result = await NoteServices.getFavoriteNotesService(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Favorite notes retrieved successfully",
    data: result,
  });
});

const updateNote = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NoteServices.updateNoteService(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Note updated successfully",
    data: result,
  });
});

const deleteNote = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await NoteServices.deleteNoteService(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Note deleted successfully",
    data: null,
  });
});

const toggleFavoriteNote = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NoteServices.toggleFavoriteNoteService(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `Note is now ${result.favorite ? "favorite" : "not favorite"}`,
    data: result,
  });
});

export const NoteController = {
  createNote,
  getAllNotes,
  getFavoriteNotes,
  updateNote,
  deleteNote,
  toggleFavoriteNote,
};
