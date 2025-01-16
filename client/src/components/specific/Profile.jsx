import { Avatar, Stack, Typography, Box } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InfoIcon from "@mui/icons-material/Info";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import React from "react";
import { transformImage } from "../../libs/features";
import moment from "moment";
import { motion } from "framer-motion";

const Profile = ({ user }) => {
  return (
    <Stack
      spacing={"2rem"}
      direction={"column"}
      alignItems={"center"}
      component={motion.div}
      initial={{ x: "100%", opacity: 0 }} // Slide in from positive X direction
      animate={{ x: 0, opacity: 1 }} // Slide to original position
      transition={{ type: "spring", stiffness: 100, damping: 20 }} // Smooth animation
      sx={{
        padding: "2rem",
        borderRadius: "16px",
        backgroundColor: "#1f1f2f", // Dark background for profile
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        maxHeight: "calc(100vh - 40px)", // Ensure it doesn't overlap footer (adjust value as needed)
        overflowY: "auto", // Enable scrolling for overflow content
        width: "100%",
        "&::-webkit-scrollbar": {
          display: "none", // Hide the scrollbar in Webkit-based browsers (Chrome, Safari)
        },
      }}
    >
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          objectFit: "cover", // Ensures the avatar image maintains aspect ratio
          marginBottom: "1rem",
          border: "5px solid white",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)", // Slight zoom effect on hover
            boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.2)",
          },
        }}
      />
      <ProfileCard
        heading={"Bio"}
        text={user?.bio || "No bio available"}
        Icon={<InfoIcon />}
      />
      <ProfileCard
        heading={"Username"}
        text={user?.username || "Not set"}
        Icon={<AlternateEmailIcon />}
      />
      <ProfileCard
        heading={"Name"}
        text={user?.name || "Not provided"}
        Icon={<FaceIcon />}
      />
      <ProfileCard
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow() || "N/A"}
        Icon={<CalendarMonthIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <motion.div
    initial={{ x: "100%", opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{
      type: "spring",
      stiffness: 80,
      damping: 15,
      delay: 0.2,
    }}
  >
    <Box
      sx={{
        width: "100%",
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#2d2d3a", // Subtle background for card
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.2)", // Hover shadow for interaction
        },
      }}
    >
      <Box
        sx={{
          width: "40px",
          height: "40px",
          backgroundColor: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "1rem",
        }}
      >
        {Icon}
      </Box>
      <Stack>
        <Typography
          variant="body1"
          sx={{
            color: "white",
            fontWeight: "600", // Bolder text for better readability
            fontSize: "1rem", // Adjusted font size for better readability
          }}
        >
          {text}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "lightgray",
            fontSize: "0.875rem", // Slightly smaller font for heading
            fontStyle: "italic", // Added italics for heading
            marginTop: "0.2rem",
          }}
        >
          {heading}
        </Typography>
      </Stack>
    </Box>
  </motion.div>
);

export default Profile;