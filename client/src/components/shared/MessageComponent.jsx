import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import moment from "moment";
import { fileFormat } from "../../libs/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const messageAlignment = sameSender ? "flex-end" : "flex-start";
  const senderColor = sameSender ? "#00ff15" : "#ff204e";

  return (
    <motion.div
      initial={{ opacity: 0, x: sameSender ? "100%" : "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 70 }}
      style={{
        alignSelf: messageAlignment,
        fontSize: "16px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: sameSender ? "#122529" : "#1b004bb0",
        borderRadius: "12px",
        padding: "10px",
        maxWidth: "70%",
        color: "white",
        margin: "5px 0",
        wordBreak: "break-word",
      }}
    >
      <Typography
        color={senderColor}
        textTransform={sameSender ? "uppercase" : "capitalize"}
        sx={{ fontWeight: 600 }}
      >
        {sender.name}
      </Typography>
      {content && (
        <Typography sx={{ marginTop: "5px", lineHeight: "1.5" }}>
          {content}
        </Typography>
      )}
      {attachments.length > 0 && (
        <Box sx={{ marginTop: "10px" }}>
          {attachments.map((attachment, index) => {
            const url = attachment.url;
            const file = fileFormat(url);
            return (
              <Box key={index} sx={{ marginBottom: "5px" }}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#ddd", textDecoration: "none" }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })}
        </Box>
      )}
      <Typography
        sx={{
          marginTop: "10px",
          fontSize: "12px",
          color: "#bbb",
          textAlign: "right",
        }}
      >
        {moment(createdAt).fromNow()}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);