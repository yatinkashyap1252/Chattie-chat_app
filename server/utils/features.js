import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { getBase64, getSockets } from "../lib/helper.js";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

export const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "Chattie" })
    .then(() => {
      console.log(`Connected to db`);
    })
    .catch((err) => {
      throw err;
    });
};

export const sendToken = (res, user, code, message) => {
  const token = user.genToken();
  res
    .status(code)
    .cookie("chattie", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
    });
};

export const uploadToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      const mimetype = file.mimetype;

      let resource_type = "raw"; // default to raw for safety
      if (mimetype.startsWith("image/")) resource_type = "image";
      else if (mimetype.startsWith("video/")) resource_type = "video";
      else if (mimetype.startsWith("audio/")) resource_type = "video"; // Cloudinary uses video for audio too
      // pdf/doc/zip etc will remain as 'raw'

      cloudinary.uploader.upload(
        file.path,
        {
          resource_type,
          public_id: uuid() + path.extname(file.originalname),
          folder: "attachments",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);
    return results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw new Error("Problem uploading files to Cloudinary");
  }
};

export const deleFilesFromCloudinary = async (public_id) => {};

export const emitEvent = (req, event, users, data) => {
  const userSockets = getSockets(users);
  const io = req.app.get("io");
  io.to(userSockets).emit(event, data);
  console.log("emmiting event:", event);
};
