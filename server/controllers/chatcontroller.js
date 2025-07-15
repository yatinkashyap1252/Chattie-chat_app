import {
  ALERT,
  NEW_ATTACHMENTS,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { getOtherMembers } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import {
  deleFilesFromCloudinary,
  emitEvent,
  uploadToCloudinary,
} from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import fs from "fs";

export const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  // if (members.length < 2) {
  //     return next(new ErrorHandler("Group chat must contain more than 2 members!", 400))
  // }
  const allMembers = [...members, req.user];
  const groupChat = await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });
  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group chat`);
  emitEvent(req, REFETCH_CHATS, members, `Welcome to ${name} group chat`);
  return res.status(201).json({
    success: true,
    message: "Group chat created successfully",
    groupChat,
  });
});

export const getMyChat = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user })
    .populate("members", "name avatar")
    .lean(); // Ensures plain objects

  const transformChats = chats.map(({ _id, name, members, groupChat }) => {
    const othermember = getOtherMembers(members, req.user);
    return {
      _id,
      groupChat,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar?.url)
        : [othermember?.avatar?.url],
      name: groupChat ? name : othermember?.name,
      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.user.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });

  return res.status(200).json({
    success: true,
    chats: transformChats,
  });
});

export const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    groupChat: true,
    creator: req.user,
    members: req.user,
  }).populate("members", "name avatar");
  const groups = chats.map(({ members, _id, groupChat, name }) => ({
    _id,
    groupChat,
    name,
    avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
  }));

  return res.status(200).json({
    success: true,
    groups,
  });
});

export const AddMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;

  if (!members || members.length < 1)
    return next(new ErrorHandler("Please provide members!", 400));

  const chat = await Chat.findById(chatId);
  if (!chat) {
    return res.status(404).json({
      success: false,
      message: "Chat not found",
    });
  }
  if (!chat.groupChat) {
    return res.status(400).json({
      success: false,
      message: "Groupchat is not found!",
    });
  }

  if (chat.creator.toString() !== req.user.toString()) {
    return res.status(403).json({
      success: false,
      message: "You are not the creator of this group chat",
    });
  }

  const allNewMembersPromise = members.map((i) => User.findById(i, "name"));

  const allNewMembers = await Promise.all(allNewMembersPromise);

  const uniqueMember = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id);

  chat.members.push(...uniqueMember);

  if (chat.members.length > 100) {
    return next(new ErrorHandler("Group members limit reached", 400));
  }

  await chat.save();

  const allmember = allNewMembers.map((i) => i.name).join(" ");

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${allmember} has been added to ${chat.name} group`
  );

  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Members added successfully",
  });
});

export const removeMembers = TryCatch(async (req, res, next) => {
  const { userId, chatId } = req.body;
  const [chat, userThatWillRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);
  if (!userId || userId.toString().length < 1)
    return next(new ErrorHandler("Please provide members!", 400));
  if (!chat) {
    return res.status(404).json({
      success: false,
      message: "Chat not found",
    });
  }
  if (!chat.groupChat) {
    return res.status(400).json({
      success: false,
      message: "Groupchat is not found!",
    });
  }
  if (!userThatWillRemoved) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  if (chat.creator.toString() !== req.user.toString()) {
    return res.status(403).json({
      success: false,
      message: "You are not the creator of this group chat",
    });
  }
  if (chat.members.length <= 3) {
    return res.status(400).json({
      success: false,
      message: "Group chat must have at least 4 members",
    });
  }

  const allMembers = chat.members.map((i) => i.toString());

  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );

  await chat.save();

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${userThatWillRemoved} has been remove from group`
  );

  emitEvent(req, REFETCH_CHATS, allMembers);

  return res.status(200).json({
    success: true,
    message: "Members removed successfully",
  });
});

export const leaveChat = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);

  if (!chat) {
    return res.status(404).json({
      success: false,
      message: "Chat not found",
    });
  }
  if (!chat.groupChat) {
    return res.status(400).json({
      success: false,
      message: "Groupchat is not found!",
    });
  }
  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.user.toString()
  );
  if (remainingMembers.length <= 3) {
    return res.status(400).json({
      success: false,
      message: "Group chat must have at least 4 members",
    });
  }
  if (chat.creator.toString() === req.user.toString()) {
    const randomMemberIndex = Math.floor(
      Math.random() * remainingMembers.length
    );
    chat.creator = remainingMembers[randomMemberIndex];
  }
  chat.members = remainingMembers;
  const [user] = await Promise.all([
    User.findById(req.user, "name"),
    chat.save(),
  ]);
  emitEvent(req, ALERT, chat.members, `${user.name} has left the group`);
  return res.status(200).json({
    success: true,
    message: "Successfully left the chat",
  });
});

export const sendAttachments = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;
  const files = req.files || [];

  if (files.length < 1)
    return next(new ErrorHandler("Please provide valid file!", 401));

  if (files.length > 5)
    return next(new ErrorHandler("Attachments must be 1-5!", 401));

  const [chat, me] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user, "name"),
  ]);
  if (!chatId) {
    return next(new ErrorHandler("Please fill full form!", 400));
  }
  if (!chat) {
    return next(new ErrorHandler("Chat not Found!", 400));
  }

  if (files.length < 1) {
    return next(new ErrorHandler("Please provide attachments!", 400));
  }

  const attachments = await uploadToCloudinary(files);

  console.log("Cloudinary Upload Result:", attachments);

  files.forEach((file) => {
    fs.unlink(file.path, (err) => {
      if (err) console.error("File delete error:", err);
    });
  });

  const messageForRealTime = {
    content: "",
    attachments,
    sender: { _id: me._id, name: me.name },
    chat: chatId,
  };

  const messageforDb = {
    content: "",
    attachments,
    sender: me._id,
    chat: chatId,
  };

  const message = await Message.create(messageforDb);

  emitEvent(req, NEW_ATTACHMENTS, chat.members, {
    message: messageForRealTime,
    chatId,
  });

  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

  return res.status(200).json({
    success: true,
    message,
  });
});

export const getChatDetail = TryCatch(async (req, res, next) => {
  const chatId = req.params.id; // Directly access req.params.id
  // console.log("Received chatId:", chatId);

  if (req.query.populate === "true") {
    const chat = await Chat.findById(chatId)
      .populate("members", "name avatar")
      .lean(); // lean() is good practice for optimization
    if (!chat) {
      return next(new ErrorHandler("Chat not Found!", 400));
    }
    chat.members = chat.members.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar?.url, // Ensure avatar is safely accessed
    }));
    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return next(new ErrorHandler("Chat not Found!", 400));
    }
    return res.status(200).json({
      success: true,
      chat,
    });
  }
});

export const RenameGroup = TryCatch(async (req, res, next) => {
  const { name } = req.body;
  const ChatId = req.params.id;
  const chat = await Chat.findById(ChatId);
  if (!name) {
    return next(new ErrorHandler("Please enter the name!", 400));
  }
  if (!chat) {
    return next(new ErrorHandler("Chat not Found!", 400));
  }
  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat!", 400));
  }
  if (chat.creator.toString() !== req.user.toString()) {
    return next(
      new ErrorHandler("You are not the creator of this group!", 400)
    );
  }
  chat.name = name;
  await chat.save();
  emitEvent(req, REFETCH_CHATS, chat.members);
  return res.status(200).json({
    success: true,
    message: "Group name changed successfully",
  });
});

export const DeleteChat = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new ErrorHandler("Chat not Found!", 400));
  }
  const members = chat.members;
  if (chat.groupChat && chat.creator.toString() !== req.user.toString()) {
    return next(
      new ErrorHandler("You are not the creator of this group!", 400)
    );
  }
  if (!chat.groupChat && !chat.members.includes(req.user.toString())) {
    return next(new ErrorHandler("You are not a member of this chat!", 403));
  }
  const messageWithattachments = await Message.find({
    chatId: chatId,
    attachments: { $exists: true, $ne: [] },
  });
  const public_id = [];
  messageWithattachments.forEach(({ attachments }) => {
    attachments.forEach(({ public_id }) => {
      public_id.push(public_id);
    });
  });
  await Promise.all([
    deleFilesFromCloudinary(public_id),
    chat.deleteOne(),
    Message.deleteMany(),
  ]);
  emitEvent(req, REFETCH_CHATS, members);
  return res.status(200).json({
    success: true,
    message: "Chat deleted successfully",
  });
});

export const getMessages = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { page = 1 } = req.query;
  const limit = 20;
  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.members.includes(req.user.toString()))
    return next(
      new ErrorHandler("You are not allowed to access this chat!", 401)
    );
  const [message, totalMessagesCount] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("sender", "name")
      .lean(),
    Message.countDocuments({ chat: chatId }),
  ]);
  const totalPages = Math.ceil(totalMessagesCount / limit) || 0;
  return res.status(200).json({
    success: true,
    message: message.reverse(),
    totalPages,
  });
});
