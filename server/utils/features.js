import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import { getBase64, getSockets } from "../lib/helper.js";
import { v2 as cloudinary } from "cloudinary";

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
      cloudinary.uploader.upload(
        getBase64(file),
        { resource_type: "auto", public_id: uuid() },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });
  try {
    const results = await Promise.all(uploadPromises);
    const formattedResult = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResult
  } catch (err) {
    throw new Error("Problem uploading files to cloudinary",err);
  }
};

export const deleFilesFromCloudinary = async (public_id) => {};

export const emitEvent = (req, event, users, data) => {
  const userSockets=getSockets(users)
  const io=req.app.get("io")
  io.to(userSockets).emit(event,data)
  console.log("emmiting event:", event);
};
