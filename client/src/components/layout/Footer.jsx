import {
  Box,
  Container,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoIcon from "@mui/icons-material/Info";
// import XIcon from '@mui/icons-material/X';
import React from "react";
import { useNavigate } from "react-router-dom";
import { lingra } from "../../consonants/color";

const Footer = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  // Navigation functions
  const navigateGoogle = () => {
    console.log("search");
    navigate("google.com");
  };

  const navigateAbout = () => {
    navigate("/about");
  };

  // Tooltip style
  const tooltipStyle = {
    width: "30px",
    height: "30px",
    "&:hover": {
      bgcolor: "rgba(255,255,255,0.38)",
      transition: "0.5s",
      borderRadius: "50%",
      padding: "1px",
    },
  };

  // Footer container style
  const footerStyle = {
    zIndex: "100",
    height: "3rem",
    display: "flex",
    alignItems: "center",
    position: "static",
    bottom: "0",
    padding: "5px",
    background: lingra,
    color: "white",
    flexDirection: isMobile ? "column" : "row", // Stack items on small screens
  };

  // Typography style
  const typographyStyle = {
    fontFamily: "cursive",
    fontSize: "25px",
    paddingInlineStart: "20px",
    marginBottom: isMobile ? "10px" : "0", // Adjust spacing on mobile
  };

  return (
    <Container style={footerStyle}>
      <Typography style={typographyStyle}>Chattie...</Typography>
      <Box flexGrow={1}></Box>
      <Box>
        <Toolbar style={{ gap: "10px" }}>
          <Tooltip title="About" style={tooltipStyle}>
            <InfoIcon onClick={navigateAbout} />
          </Tooltip>
          <Tooltip title="Instagram" style={tooltipStyle}>
            <InstagramIcon />
          </Tooltip>
          <Tooltip title="GitHub" style={tooltipStyle}>
            <GitHubIcon />
          </Tooltip>
          <Tooltip title="Facebook" style={tooltipStyle}>
            <FacebookIcon />
          </Tooltip>
          {/* <Tooltip title={'X'}>
            <XIcon />
          </Tooltip> */}
        </Toolbar>
      </Box>
    </Container>
  );
};

export default Footer;
