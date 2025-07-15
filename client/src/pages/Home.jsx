import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <Container
      style={{
        background: "rgb(35 35 47)",
        minHeight: "100%",
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        border: "3px solid rgb(0,0,0)",
      }}
    >
      <Typography
        style={{
          fontFamily: "Licorice",
          textAlign: "center",
          fontSize: "70px",
          fontWeight: "400",
          letterSpacing: "1.5rem",
        }}
      >
        Welcome to
      </Typography>
      <Typography
        style={{ fontFamily: "Licorice", fontSize: "100px", fontWeight: "700" }}
      >
        Chattie...
      </Typography>
    </Container>
  );
};

export default AppLayout()(Home);
