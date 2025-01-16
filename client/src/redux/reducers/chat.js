import { createSlice } from "@reduxjs/toolkit";
import { getSaveFunc } from "../../libs/features";
import { NEW_MESSAGE_ALERT } from "../../../../server/constants/events";

const initialState = {
  notificationCount: 0,
  newMessageAlert: getSaveFunc({ key: "NEW_MESSAGE_ALERT", get: true }) || [
    {
      chatId: "",
      count: 0,
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotification: (state) => {
      // console.log("incrementing");
      state.notificationCount = state.notificationCount + 1;
    },
    resetNotification: (state) => {
      state.notificationCount = 0;
    },
    setNewMessageAlert: (state, action) => {
      const chatId = action.payload.chatId;
      const index = state.newMessageAlert.findIndex(
        (item) => item.chatId === chatId
      );
      if (index !== -1) {
        state.newMessageAlert[index].count += 1;
      } else {
        state.newMessageAlert.push({
          chatId: chatId,
          count: 1,
        });
      }
    },
    removeAlert: (state, action) => {
      state.newMessageAlert = state.newMessageAlert.filter(
        (item) => item.chatId !== action.payload
      );
    },
  },
});

export default chatSlice;
export const {
  incrementNotification,
  resetNotification,
  setNewMessageAlert,
  removeAlert,
} = chatSlice.actions;
