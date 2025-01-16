import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { emitEvent, sendToken, uploadToCloudinary } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Request } from "../models/request.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMembers } from "../lib/helper.js";

const newUser = TryCatch(async (req, res, next) => {
  const { name, username, bio, password } = req.body;

  const file = req.file;
  // console.log(file)

  if (!file) return next(new ErrorHandler("Please upload Avatar", 401));

  const result = await uploadToCloudinary([file]);

  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };

  // if(!name||!username||!password){
  //     return res.status(400).json({message:"Please fill in all fields."})
  // }
  const user = await User.create({
    name,
    bio,
    password,
    username,
    avatar,
  });
  sendToken(res, user, 200, "User created");
});

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  // if(!username||!password){
  //     res.status(400).json({
  //         success:false,
  //         message:"Please fill full form"
  //     })
  // }
  const user = await User.findOne({ username }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid username", 400));

  const isMatch = await compare(password, user.password);

  if (!isMatch) return next(new ErrorHandler("Invalid password", 400));

  sendToken(res, user, 200, `Welcome back! ${user.name}`);
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user).select("-password");
  res.status(200).json({
    success: true,
    data: req.user,
    user,
    message: "Successfully",
    // message:"successfully"
  });
});

const logoutUser = TryCatch(async (req, res, next) => {
  res.clearCookie("chattie");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

const searchUser = TryCatch(async (req, res, next) => {
  try {
    const { name = "" } = req.query;

    // Get all chats that are not group chats and contain the current user
    const myChats = await Chat.find({ groupChat: false, members: req.user });

    // console.log(myChats)

    // Flatten all members from these chats, convert to strings, and remove duplicates using a Set
    const allUserFromMyChat = [
      ...new Set(
        myChats
          .map((chat) => chat.members)
          .flat()
          .map((member) => member.toString())
      ), // Convert ObjectId to string
    ];

    // console.log(allUserFromMyChat)

    // Query all users except those who are in my chats
    const users = await User.find({
      _id: { $nin: allUserFromMyChat }, // Exclude users from chats
      name: { $regex: name, $options: "i" }, // Case-insensitive search for name
    });

    // console.log(users)

    // Format the user data to return
    const formattedUsers = users.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar ? avatar.url : null, // Handle missing avatar field gracefully
    }));

    return res.status(200).json({
      success: true,
      users: formattedUsers,
    });
  } catch (error) {
    // Pass the error to the next middleware (if you want to use a global error handler)
    next(error);
  }
});

export const sendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;
  // console.log(req.user)
  // console.log(userId)
  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });
  if (request)
    return next(new ErrorHandler("Request already sended sucessfully!", 400));

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);

  return res.status(200).json({
    success: true,
    message: "Friend Request Sent",
  });
});

export const acceptRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  if (!request) return next(new ErrorHandler("Request not found", 404));

  if (request.receiver._id.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not authorized to accept this request!", 400)
    );

  if (!accept) {
    await request.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Request rejected successfully!",
    });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name}-${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Request accepted successfully",
    senderId: request.sender._id,
  });
});

export const GetNotification = TryCatch(async (req, res) => {
  const requests = await Request.find({ receiver: req.user }).populate(
    "sender",
    "name avatar"
  );
  const allRequest = requests.map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }));
  return res.status(200).json({
    success: true,
    request: allRequest,
  });
});

export const GetMyFriends = TryCatch(async (req, res, next) => {
  const chatId = req.query.chatId;
  const chat = await Chat.find({
    members: req.user,
    groupChat: false,
  }).populate("members", "name avatar");

  const friends = chat.map(({ members }) => {
    const otherUser = getOtherMembers(members, req.user);

    return {
      _id: otherUser._id,
      name: otherUser.name,
      avatar: otherUser.avatar.url,
    };
  });
  if (chatId) {
    const chats = await Chat.findById(chatId);
    const availableFriends = friends.filter(
      (friend) => !chats.members.includes(friend._id)
    );
    return res.status(200).json({
      success: true,
      friends: availableFriends,
    });
  } else {
    return res.status(200).json({
      success: true,
      friends,
    });
  }
});

export { login, newUser, getMyProfile, logoutUser, searchUser };
