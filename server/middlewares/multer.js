import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";

// Save uploaded files to "uploads/" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists!
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, uuid() + ext);
  },
});

export const multerUpload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // Allow larger files (e.g., 10 MB)
  },
});

export const singleAvatar = multerUpload.single("avatar");
export const attachmentMulter = multerUpload.array("files", 5);
