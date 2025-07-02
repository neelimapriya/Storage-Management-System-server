import multer from "multer";
import fs from "fs";
import path from "path";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import config from "../config";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage });

export const sendPDFToCloudinary = (
  publicId: string,
  filePath: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        public_id: publicId,
        resource_type: "auto",
      },
      (error, result) => {
        fs.unlink(filePath, () => {});
        if (error) return reject(error);
        resolve(result as UploadApiResponse);
      }
    );
  });
};
