import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentMulter } from "../middlewares/multer.js";
import {
  AddMembers,
  DeleteChat,
  getChatDetail,
  getMessages,
  getMyChat,
  getMyGroups,
  leaveChat,
  newGroupChat,
  removeMembers,
  RenameGroup,
  sendAttachments,
} from "../controllers/chatcontroller.js";
import {
  addMemberValidator,
  getChatDetailValidator,
  getMessageValidator,
  leaveGroupValidator,
  newGroupChatValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  validateHandle,
} from "../lib/validator.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/new", newGroupChatValidator(), validateHandle, newGroupChat);
app.get("/my", getMyChat);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMemberValidator(), validateHandle, AddMembers);
app.put(
  "/removemembers",
  removeMemberValidator(),
  validateHandle,
  removeMembers
);
app.delete("/leave/:id", leaveGroupValidator(), validateHandle, leaveChat);
app.post(
  "/message",
  attachmentMulter,
  sendAttachmentsValidator(),
  validateHandle,
  sendAttachments
);

app.get("/messages/:id", getMessageValidator(), validateHandle, getMessages);

app
  .route("/:id")
  .get(getChatDetailValidator(), validateHandle, getChatDetail)
  .put(renameValidator(), validateHandle, RenameGroup)
  .delete(getChatDetailValidator(), validateHandle, DeleteChat);

export default app;
