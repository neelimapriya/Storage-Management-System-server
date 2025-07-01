import { z } from "zod";

export const createFolderSchema = z.object({
  name: z.string().min(1, { message: "Folder name is required" }),
  favorite: z.boolean().optional(), 
});

export const FolderValidation={
    createFolderSchema
}