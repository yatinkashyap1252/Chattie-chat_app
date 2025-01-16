import { socketUserIDs } from "../app.js";

export const getOtherMembers = (members, userId) =>
  members.find((members) => members._id.toString() !== userId.toString());

export const getSockets = (users) => {
  const socket = users.map((user) => socketUserIDs.get(user.toString()));
  return socket;
};

export const getBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
