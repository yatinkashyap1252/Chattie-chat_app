// import { Stack } from "@mui/material";
// import React from "react";
// import ChatItem from "../shared/ChatItem";

// const Chatlist = ({
//   w = "100%",
//   chats = [],
//   chatId,
//   onlineUsers = [],
//   newMessagesAlert = [{ chatId: "", count: 0 }],
//   handleDeleteChat,
// }) => {
//   return (
//     <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
//       {chats?.map((data, index) => {
//         const { _id, name, groupChat, members } = data;
//         const newMessageAlert = newMessagesAlert.find(
//           ({ chatId }) => chatId === _id
//         );
//         const isOnline = members?.some((member) => onlineUsers.includes(_id));
//         return (
//           <ChatItem
//             index={index}
//             newMessagesAlert={newMessageAlert}
//             isOnline={isOnline}
//             name={name}
//             _id={_id}
//             key={_id}
//             groupChat={groupChat}
//             sameSender={chatId === _id}
//             handleDeleteChat={handleDeleteChat}
//           />
//         );
//       })}
//     </Stack>
//   );
// };

// export default Chatlist;

// import { Stack } from "@mui/material";
// import React from "react";
// import ChatItem from "../shared/ChatItem";
// import { motion } from "framer-motion";

// const Chatlist = ({
//   w = "100%",
//   chats = [],
//   chatId,
//   onlineUsers = [],
//   newMessagesAlert = [{ chatId: "", count: 0 }],
//   handleDeleteChat,
// }) => {
  
//   return (
//     <Stack
//       width={w}
//       direction="column"
//       height="100%"
//       sx={{
//         overflowY: "auto", // Enable vertical scrolling
//         overflowX: "hidden", // Prevent horizontal scrolling
//         "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Webkit browsers
//         msOverflowStyle: "none", // For Internet Explorer and Edge
//         scrollbarWidth: "none", // For Firefox
//       }}
//     >
//       {chats?.map((data, index) => {
//         const { _id, name, groupChat, members } = data;
//         const newMessageAlert = newMessagesAlert.find(
//           ({ chatId }) => chatId === _id
//         );
//         const isOnline = members?.some((member) => onlineUsers.includes(_id));

//         // Animation properties
//         const animationDelay = index * 0.01; // Stagger animation for each item

//         return (
//           <motion.div
//             key={_id}
//             initial={{ x: "-100%", opacity: 0 }} // Slide in from the left
//             whileInView={{ x: 0, opacity: 1 }} // End position
//             transition={{
//               type: "spring",
//               stiffness: 300,
//               damping: 30,
//               delay: animationDelay, // Add delay for stagger effect
//             }}
//             style={{
//               marginBottom: "8px", // Adjust spacing between items
//               width: "100%", // Ensure full width of the container
//             }}
//           >
//             <ChatItem
//               index={index}
//               newMessagesAlert={newMessageAlert}
//               isOnline={isOnline}
//               name={name}
//               _id={_id}
//               groupChat={groupChat}
//               sameSender={chatId === _id}
//               handleDeleteChat={handleDeleteChat}
//             />
//           </motion.div>
//         );
//       })}
//     </Stack>
//   );
// };

// export default Chatlist;


import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChatItem from "../shared/ChatItem";
import { motion } from "framer-motion";

const Chatlist = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [{ chatId: "", count: 0 }],
  handleDeleteChat,
}) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Check if chats are loaded and ready for rendering
  useEffect(() => {
    if (chats && chats.length > 0) {
      setIsDataLoaded(true);
    }
  }, [chats]);

  if (!isDataLoaded) {
    return <p>Loading...</p>; // Return loading message until data is available
  }

  return (
    <Stack
      width={w}
      direction="column"
      height="100%"
      sx={{
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {chats.map((data, index) => {
        const { _id, name, groupChat, members } = data;

        // Handle case where newMessagesAlert doesn't contain the chatId
        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        ) || { chatId: "", count: 0 }; // Default value to avoid null errors

        const isOnline = members?.some((member) => onlineUsers.includes(_id));

        // Calculate animation delay for staggered effect
        const animationDelay = index * 0.01;

        return (
          <motion.div
            key={_id}
            initial={{ x: "-100%", opacity: 0 }} // Slide in from the left
            animate={{ x: 0, opacity: 1 }} // End position
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: animationDelay, // Add delay for stagger effect
            }}
            style={{
              marginBottom: "8px", // Adjust spacing between items
              width: "100%", // Ensure full width of the container
            }}
          >
            <ChatItem
              index={index}
              newMessagesAlert={newMessageAlert}
              isOnline={isOnline}
              name={name}
              _id={_id}
              groupChat={groupChat}
              sameSender={chatId === _id}
              handleDeleteChat={handleDeleteChat}
            />
          </motion.div>
        );
      })}
    </Stack>
  );
};

export default Chatlist;
