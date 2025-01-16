import React, { useCallback, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import Chatlist from "../specific/Chatlist";
import { sampleChats } from "../../consonants/sampledata";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMychatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from "../../redux/reducers/misc";
import toast from "react-hot-toast";
import { useError, useSocketEvents } from "../../hooks/hooks";
import { getSocket } from "../../socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  REFETCH_CHATS,
} from "../../../../server/constants/events";
import { incrementNotification } from "../../redux/reducers/chat";
import { getSaveFunc } from "../../libs/features";
import DeleteChat from "../dialogs/deleteChatMenu";
import { motion } from "framer-motion";

const AppLayout = () => (Wrappedcomponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const chatId = params.chatId;
    const socket = getSocket();
    const navigate = useNavigate();
    const deleteMenuAnchor = useRef(null);
    // console.log(socket.id)

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessageAlert } = useSelector((state) => state.chat);
    // console.log(user)
    const { isLoading, data, isError, error, refetch } = useMychatsQuery("");
    // console.log("data", data);

    useError([{ isError, error }]);

    useEffect(() => {
      getSaveFunc({ key: "NEW_MESSAGE_ALERT", value: newMessageAlert });
    }, [newMessageAlert]);

    const handleDeleteChat = (e,chatId, groupChat) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.currentTarget) {
        dispatch(setIsDeleteMenu(true));
        dispatch(setSelectedDeleteChat({chatId,groupChat}))
        deleteMenuAnchor.current = e.currentTarget;
      }
      // console.log("delete chat", chatId, groupChat);
    };

    const handleMobileClose = () => dispatch(setIsMobile(false));

    const newMessageAlertHandler = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(newMessageAlertHandler(data));
        // const ds=data.chatId
        // console.log(ds)
      },
      [chatId]
    );
    const newRequestHandler = useCallback(() => {
      console.log("hello");
      dispatch(incrementNotification());
    }, [dispatch]);
    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);
    const eventHandler = {
      ["NEW_REQUEST"]: newRequestHandler,
      ["NEW_MESSAGE_ALERT"]: newMessageAlertHandler,
      ["REFETCH_CHATS"]: refetchListener,
    };
    useSocketEvents(socket, eventHandler);

    return (
      <>
        <Title />
        <Header />
        <DeleteChat dispatch={dispatch} deleteChatAnchor={deleteMenuAnchor} />
        {isLoading ? (
          <Skeleton />
        ) : (
          < Drawer
            ModalProps={{
              keepMounted: true, // Keep DOM elements mounted even when Drawer is closed
              disableEnforceFocus: true, // Disable Material-UI's default focus enforcement
              "data-inert": !isMobile, // Add inert when the drawer is closed
            }}
            open={isMobile}
            onClose={handleMobileClose}
            sx={{
              "& .MuiDrawer-paper": {
                width: "70vw", // Set the width of the drawer
                bgcolor: "black", // Optional: Set the background color of the drawer
                color: "white", // Optional: Text color
              },
            }}
          >
            <Chatlist
              chatId={chatId}
              chats={data?.chats}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessageAlert}
            />
          </Drawer>
        )}
        <Grid container height={"calc(100vh-4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            color={"white"}
            height={"100vh"}
            style={{
              border: "5px solid rgb(0,0,0)",
              borderRightColor: "rgb(19 19 35)",
              background: "rgb(19 19 35)",
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <Chatlist
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessageAlert}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100vh"}>
            <Wrappedcomponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100vh"}
            bgcolor={"rgb(48 48 54)"}
            style={{
              border: "5px solid rgb(0,0,0)",
              borderLeftColor: "rgb(48 48 54)",
            }}
            color={"white"}
            sx={{ display: { xs: "none", md: "block" },paddingTop:"1rem"}}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  };
};

export default AppLayout;
