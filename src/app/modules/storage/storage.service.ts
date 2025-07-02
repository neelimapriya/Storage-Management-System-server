import { Note } from "../note/note.model";
import { UploadFile } from "../files/files.model";
import { PDF } from "../pdf/pdf.model";

export const getUserStorageUsage = async (userId: string) => {
  // Notes: sum of content size
  const notes = await Note.find({ user: userId }).select("content");
  const notesBytes = notes.reduce(
    (acc, note) => acc + Buffer.byteLength(note.content || "", "utf-8"),
    0
  );

  // Files
  const files = await UploadFile.find({ user: userId }).select("size").lean();
  const filesBytes = files.reduce((acc, file) => acc + (file.size || 0), 0);

  // PDFs
  const pdfs = await PDF.find({ user: userId }).select("size").lean();
const pdfBytes = pdfs.reduce((acc, pdf) => acc + (pdf.size || 0), 0);


  const totalBytes = notesBytes + filesBytes + pdfBytes;

  const bytesToMB = (bytes: number) => bytes / 1024 ** 2;
  const bytesToGB = (bytes: number) => bytes / 1024 ** 3;

  const usageMB = parseFloat(bytesToMB(totalBytes).toFixed(2));
  const usageGB = parseFloat(bytesToGB(totalBytes).toFixed(3));
  const maxGB = 15;

  return {
    totalBytes,
    usageMB,
    usageGB,
    maxStorageGB: maxGB,
    availableGB: parseFloat((maxGB - usageGB).toFixed(3)),
  };
};
