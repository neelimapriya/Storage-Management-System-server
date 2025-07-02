import { z } from "zod";

export const createUploadFilesSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["image", "pdf"], {
    errorMap: () => ({ message: "Type must be either 'image' or 'pdf'" }),
  }),
  folderId: z.string().min(1, "Folder ID is required"),
});
