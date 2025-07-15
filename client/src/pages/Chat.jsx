import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import AppLayout from "../components/layout/AppLayout";
import { Box, IconButton, Skeleton, Stack } from "@mui/material";
import { InputBox } from "../components/styles/StyledComponents";
import Filemenu from "../components/dialogs/Filemenu";
import { sampleMessage } from "../consonants/sampledata";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../consonants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useError, useSocketEvents } from "../hooks/hooks";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../components/layout/Loading";
import { useNavigate } from "react-router-dom";

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [page, setPage] = useState(1);
  const [iAmTyping,setIAmTyping]=useState(false)
  const [userTyping,setUserTyping]=useState(false)
  const typingTimeOut=useRef(null)
  const bottomRef=useRef(null)
  const navigate=useNavigate()

  const oldMessageChunk = useGetMessagesQuery({ chatId, page });
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessageChunk.isError, error: oldMessageChunk.error },
  ];

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessageChunk.data?.totalPages,
    page,
    setPage,
    oldMessageChunk.data?.message
  );

  // console.log(oldMessages)
  // console.log(oldMessageChunk?.data)

  const members = chatDetails?.data?.chat?.members;
  // console.log(members)

  const handleFile = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // console.log("Received NEW_MESSAGE:", { chatId, members, message });
    socket.emit("NEW_MESSAGE", { chatId, members, message });

    // console.log(message);
    setMessage("");
  };

  useEffect(() => {
    dispatch(removeAlert(chatId))
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]), 
      setPage(1);
    };
  }, [chatId]);

  useEffect(()=>{
    if(bottomRef.current) bottomRef.current.scrollIntoView({behaviour:"smooth"})
  },[messages])

  useEffect(()=>{if(!chatDetails?.data?.chat) return navigate("/")},[chatDetails?.data])

  const messageOnChangeHandler=(e)=>{
    setMessage(e.target.value)
    if(!iAmTyping){
      socket.emit("START_TYPING",{members,chatId})
      setIAmTyping(true)
    }
    if(typingTimeOut.current) clearTimeout(typingTimeOut.current)
    typingTimeOut.current= setTimeout(() => {
      socket.emit("STOP_TYPING",{members,chatId})
      setIAmTyping(false)
    }, [2000]);
  }

  const newMessagehandler = useCallback((data) => {
    // console.log(data)
    if (data.chatId !== chatId) return;
    setMessages((prev) => [...prev, data.message]);
  }, [chatId]);

  const startTypingListener=useCallback((data)=>{
    if(data.chatId!==chatId) return
    // console.log("start typing",data)
    setUserTyping(true)
  },[chatId])

  const stopTypingListener=useCallback((data)=>{
    if(data.chatId!==chatId) return
    // console.log("stop typing",data)
    setUserTyping(false)
  },[chatId])

  const allMessages = [...oldMessages, ...messages];

  const eventArr = { ["NEW_MESSAGE"]: newMessagehandler,["START_TYPING"]: startTypingListener,["STOP_TYPING"]: stopTypingListener };

  useSocketEvents(socket, eventArr);
  useError(errors);

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Box sx={{ border: "5px solid rgb(0,0,0)",background:"#5d00ffff" }}>
        <Stack
          ref={containerRef}
          boxSizing={"border-box"}
          spacing={"1rem"}
          padding={"1rem"}
          bgcolor={"#2f2b36"}
          height={"70vh"}
          sx={{ overflowX: "hidden", overflowY: "auto" }}
        >
          {allMessages.map((i) => (
            <MessageComponent message={i} user={user} key={i._id} />
          ))}
          {userTyping && <TypingLoader/>}
          <div ref={bottomRef} />
        </Stack>
      </Box>

      <form
        onSubmit={submitHandler}
        style={{ borderRadius: "25px", background: "black", padding: "5px 0" }}
      >
        <Stack
          overflow={"hidden"}
          height={"7vh"}
          spacing={"5px"}
          padding={"0 5px"}
          direction={"row"}
          display={"flex"}
          alignItems={"center"}
        >
          <IconButton
            style={{
              background: "linear-gradient(#4040ff, #590796)",
              color: "white",
            }}
            onClick={handleFile}
          >
            <AttachFileIcon style={{ transform: "rotate(-90deg)" }} />
          </IconButton>
          <InputBox
            placeholder="Type Message here..."
            color="black"
            value={message}
            onChange={messageOnChangeHandler}
          />
          <IconButton
            type="submit"
            style={{
              background: "linear-gradient(#4040ff, #590796)",
              color: "white",
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <Filemenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

export default AppLayout()(Chat);
