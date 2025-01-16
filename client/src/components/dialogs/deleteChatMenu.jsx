import { Menu, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc";
import { DeleteOutline, ExitToApp } from "@mui/icons-material";
import { useAsyncMutation } from "../../hooks/hooks";
import { useDeleteChatMutation, useLeaveGroupMutation } from "../../redux/api/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DeleteChat = ({ dispatch, deleteChatAnchor }) => {
  const navigate = useNavigate();
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );
  const [deleteChatFunc, _, deleteChatFuncData] = useAsyncMutation(
    useDeleteChatMutation
  );
  const [leaveGroupFunc, __, leaveGroupFuncData] = useAsyncMutation(
    useLeaveGroupMutation
  );

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteChatAnchor.current = null;
  };

  const leaveGroup = () => {
    closeHandler();
    leaveGroupFunc("Leaving group...", selectedDeleteChat.chatId);
  };

  const deleteChat = () => {
    closeHandler();
    deleteChatFunc("Deleting chat...", selectedDeleteChat.chatId);
  };

  useEffect(() => {
    if (deleteChatFuncData || leaveGroupFuncData) return navigate("/");
  }, [deleteChatFuncData, leaveGroupFuncData]);

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteChatAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      PaperProps={{
        style: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Stack
          sx={{
            width: "10rem",
            padding: "0.5rem",
            cursor: "pointer",
            color: "white",
            borderRadius: "8px",
            transition: "background-color 0.3s ease, opacity 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
          direction={"row"}
          alignItems={"center"}
          spacing={"0.5rem"}
          onClick={selectedDeleteChat?.groupChat ? leaveGroup : deleteChat}
        >
          {selectedDeleteChat?.groupChat ? (
            <>
              <ExitToApp style={{ color: "white" }} />
              <Typography>Leave Group</Typography>
            </>
          ) : (
            <>
              <DeleteOutline style={{ color: "white" }} />
              <Typography>Delete Chat</Typography>
            </>
          )}
        </Stack>
      </motion.div>
    </Menu>
  );
};

export default DeleteChat;
