import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import { errormiddleware } from "./middlewares/error.js";
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import adminRoute from "./routes/admin.js";
import { connectDB } from "./utils/features.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import corsOptions from "./constants/config.js";
import { SocketAuthentication } from "./middlewares/auth.js";
import { START_TYPING, STOP_TYPING } from "./constants/events.js";
// import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
// import { NEW_MESSAGE } from "./constants/events.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});
app.set("io",io)

config({ path: "./config.env" });
connectDB(process.env.MONGO_URI);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// createSingleChats(10)
// createMessageInAChat("66dc3f27cca623a773303bc8",50)
// groupChat(10)
// createUser(10)

const socketUserIDs = new Map();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute); //user works as a prefix for example :https://localhost:3000/user/
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);

io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await SocketAuthentication(err,socket, next)
  );
});

io.on("connection", (socket) => {
  const user =socket.user
  // console.log(user)
  socketUserIDs.set(user.id.toString(), socket.id);
  // console.log("a user connected", socketUserIDs);
  
  socket.on("NEW_MESSAGE", async ({ chatId, members, message }) => {

    const MessageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chatId: chatId,
      createdAt: new Date().toISOString(),
    };

    const MessageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    // console.log("Emitting",MessageForRealTime)

    const userSocket = getSockets(members);

    io.to(userSocket).emit("NEW_MESSAGE", {
      chatId,
      message: MessageForRealTime,
    });
    io.to(userSocket).emit("NEW_MESSAGE_ALERT", {
      chatId,
    });
    // console.log("New Message", MessageForRealTime);
    await Message.create(MessageForDB);
  });

  socket.on(START_TYPING,({members,chatId})=>{
    // console.log("typing",chatId)
    const memberSockets=getSockets(members)
    socket.to(memberSockets).emit(START_TYPING,{chatId})
  })

  socket.on(STOP_TYPING,({members,chatId})=>{
    // console.log("typing stop",chatId)
    const memberSockets=getSockets(members)
    socket.to(memberSockets).emit(STOP_TYPING,{chatId})
  })

  socket.on("disconnect", () => {
    // console.log("User disconnected");
    socketUserIDs.delete(user._id.toString());
  });
});

app.use(errormiddleware);

server.listen(process.env.PORT, () => {
  console.log(
    `server is running from port ${
      process.env.PORT
    } in ${process.env.NODE_ENV.trim()} `
  );
});

export { socketUserIDs };
