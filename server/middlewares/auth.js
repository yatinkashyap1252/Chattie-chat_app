import jwt from "jsonwebtoken";
import { TryCatch } from "./error.js";
import { ErrorHandler } from "../utils/utility.js";
import { CHATTIE_TOKEN } from "../constants/config.js";
import { User } from "../models/user.js";

const isAuthenticated = TryCatch(async (req, res, next) => {
  const token = req.cookies[CHATTIE_TOKEN];
  // console.log(req.cookies)
  if (!token) {
    return res
      .status(401)
      .json({ message: "Please login to access this resource" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decoded)

  req.user = decoded.id;
  // console.log(req.user)
  next();
});

const SocketAuthentication = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies[CHATTIE_TOKEN];

    if (!authToken) {
      return next(new ErrorHandler("Please login to access this route", 401));
    }

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData.id);

    if (!user)
      return next(new ErrorHandler("Please login  to access this route", 401));

    socket.user = user;

    return next();

  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Please login  to access this route", 401));
  }
};

const isAdmin = TryCatch(async (req, res, next) => {
  const token = req.cookies["chattie-admin"];
  // console.log(req.cookies)
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Only Admin can access this resource",
    });
  }

  const secretKey = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
  const adminSecretKey = process.env.ADMIN_SECRET_KEY || "HELLO";
  const isMatch = adminSecretKey === secretKey;

  if (!isMatch) return next(new ErrorHandler("Invalid Admin Key", 401));

  next();
});

export { isAuthenticated, isAdmin, SocketAuthentication };
