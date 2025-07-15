import React, { useEffect } from "react";
import {
  Paper,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, fetchAdmin } from "../../redux/thunks/admin";
import { useNavigate, Navigate } from "react-router-dom";

// const isAdmin=true

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAdmin } = useSelector((state) => state.auth);

  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
    navigate("/admin/dashboard");
    console.log("submitHandler");
  };

  useEffect(() => {
    dispatch(fetchAdmin());
  }, [dispatch]);

    if (isAdmin) return <Navigate to="/admin/dashboard"></Navigate>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom,#ff5e5e, #7500ffdb)",
      }}
    >
      <Container component={"main"} maxWidth="xs">
        <Paper
          elevation={15}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "normal",
            padding: 4,
            flexDirection: "column",
            background: "linear-gradient(to bottom,black,indigo,purple)",
          }}
        >
          <Typography
            textTransform={"capitalize"}
            fontWeight={700}
            fontSize={"30px"}
            letterSpacing={"0.2rem"}
            color={"white"}
            marginBottom={"25px"}
          >
            Admin login
          </Typography>
          <form onSubmit={submitHandler}>
            <TextField
              label="secret key"
              required
              fullWidth
              variant="outlined"
              type="password"
              InputLabelProps={{ style: { color: "white" } }}
              onChange={secretKey.changeHandler}
              value={secretKey.value}
            />
            <Button
              sx={{ marginTop: "1rem" }}
              fullWidth
              variant="contained"
              type="submit"
              color="primary"
            >
              login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
