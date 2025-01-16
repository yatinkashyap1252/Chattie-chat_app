import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Link } from "../styles/StyledComponents";
import React, { memo } from "react";

const ChatItem = ({
  url,
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessagesAlert,
  handleDeleteChat,
}) => {
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      sx={{
        textDecoration: "none",
        width: "100%",
        display: "block",
        "&:hover": {
          textDecoration: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: sameSender
            ? "linear-gradient(90deg,rgb(255, 42, 181),rgb(197, 0, 69))"
            : "linear-gradient(90deg,rgb(45, 14, 89),rgb(16, 16, 33))",
          borderTopLeftRadius: "35px",
          borderBottomLeftRadius:"35px",
          padding: "10px 15px",
          boxShadow: sameSender ? "0px 4px 10px rgba(255, 126, 95, 0.5)" : "none",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        {/* Avatar and Chat Details */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          <Avatar
            src={url}
            alt={name}
            sx={{
              width: 50,
              height: 50,
              border: sameSender ? "2px solid white" : "none",
            }}
          >
            {name[0]?.toUpperCase()}
          </Avatar>
          <Box sx={{ overflow: "hidden", flexGrow: 1 }}>
            <Typography
              sx={{
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </Typography>
            {newMessagesAlert?.count > 0 && (
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#ff204e",
                  fontStyle: "italic",
                }}
              >
                {newMessagesAlert.count} New Message
              </Typography>
            )}
          </Box>
        </Stack>

        {/* Online Indicator */}
        {isOnline && (
          <Box
            sx={{
              width: "12px",
              height: "12px",
              backgroundColor: "green",
              borderRadius: "50%",
              marginLeft: "10px",
              border: "2px solid white",
            }}
          />
        )}
      </Box>
    </Link>
  );
};

export default memo(ChatItem);
