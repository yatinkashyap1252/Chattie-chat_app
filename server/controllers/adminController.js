import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";

export const AdminLogin = TryCatch(async (req, res, next) => {
  const { secretKey } = req.body;
  const adminKey = process.env.ADMIN_SECRET_KEY || "HELLO";

  const isMatch = secretKey === adminKey;

  if (!isMatch) return next(new ErrorHandler("Invalid admin key!", 401));

  const token = jwt.sign(secretKey, process.env.ADMIN_SECRET_KEY);
  res
    .status(200)
    .cookie("chattie-admin", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Authenticated successfully,Welcome Boss!",
    });
});

export const AdminLogout = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .clearCookie("chattie-admin", "", {
      expires: 0,
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const getAdminData = TryCatch(async (req, res, next) => {
  return res.status(200).json({
    admin: true,
  });
});

export const GetAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find().select("-password");
  const TransformUser = await Promise.all(
    users.map(async ({ name, username, avatar, _id,createdAt,updatedAt }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ groupChat: false, members: _id }),
      ]);
      return {
        name,
        _id,
        username,
        createdAt,
        updatedAt,
        avatar: avatar.url,
        groups,
        friends,
      };
    })
  );
  return res.status(200).json({
    success: true,
    user: TransformUser,
    message: "Users reterived successfully!",
  });
});

export const GetAllChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find()
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  const TransformChat = await Promise.all(
    chats.map(async ({ groupChat, _id, name, members, creator }) => {
      const totalMessages = await Message.countDocuments({ chat: _id });
      return {
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map((member) => member.avatar.url),
        members: members.map(({ _id, name, avatar }) => {
          return {
            _id,
            name,
            avatar: avatar.url,
          };
        }),
        creator: {
          name: creator?.name || "None",
          avatar: creator?.avatar.url || "",
        },
        totalMembers: members.length,
        totalMessages,
      };
    })
  );

  return res.status(200).json({
    success: true,
    chat: TransformChat,
  });
});

export const getAllMessages = TryCatch(async (req, res, next) => {
  const message = await Message.find({})
    .populate("sender", "name avatar")
    .populate("chat", "groupChat");
  const TransformMessage = message.map(
    ({ content, attachments, _id, sender, createdAt, chat }) => {
      return {
        _id,
        attachments,
        content,
        createdAt,
        chat: chat._id,
        groupChat: chat.groupChat,
        sender: {
          _id: sender._id,
          name: sender.name,
          avatar: sender.avatar.url,
        },
      };
    }
  );
  return res.status(200).json({
    success: true,
    message: TransformMessage,
  });
});

export const Dashboard = TryCatch(async (req, res, next) => {
  const [TotalMessages, TotalChats, TotalGroupChats, TotalUsers] =
    await Promise.all([
      Message.countDocuments(),
      Chat.countDocuments(),
      Chat.countDocuments({ groupChat: true }),
      User.countDocuments(),
    ]);
  const today = new Date();
  const LastSevendays = new Date();
  LastSevendays.setDate(LastSevendays.getDate() - 7);

  const last7days = await Message.find({
    createdAt: {
      $gte: LastSevendays,
      $lte: today,
    },
  }).select("createdAt");

  const messages = new Array(7).fill(0);

  const dayInMillisec = 1000 * 60 * 60 * 24;
  last7days.forEach((message) => {
    const index = Math.floor(
      (today.getTime() - message.createdAt.getTime()) / dayInMillisec
    );
    messages[6 - index]++;
  });

  const stats = {
    TotalUsers,
    TotalChats,
    TotalMessages,
    TotalGroupChats,
    messagesChart: messages,
  };
  return res.status(200).json({
    success: true,
    stats,
  });
});
