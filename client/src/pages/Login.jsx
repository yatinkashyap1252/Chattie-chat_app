import React, { useState } from "react";
import {
  Paper,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { emailValidator, usernameValidator } from "../utils/validators";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";
import { server } from "../consonants/config";
import { useDispatch } from "react-redux";
import { Userexist } from "../redux/reducers/auth";
import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState(""); // For password confirmation
  const register = () => setIsLogin(false);
  const back = () => setIsLogin(true);
  const name = useInputValidation("");
  const Username = useInputValidation("", usernameValidator);
  const email = useInputValidation("", emailValidator);
  const bio = useInputValidation("");
  const password = useStrongPassword("");
  const avatar = useFileHandler("single");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        { username: Username.value, password: password.value },
        config
      );
      dispatch(Userexist(true));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message?.toString() || "Something went wrong");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.value !== passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    if (avatar.file) {
      formData.append("avatar", avatar.file);
    } else {
      toast.error("Please provide an avatar image!");
      return;
    }
    formData.append("name", name.value);
    formData.append("username", Username.value);
    formData.append("bio", bio.value);
    formData.append("password", password.value);

    try {
      const { data } = await axios.post(`${server}/api/v1/user/new`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(Userexist(true));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

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
          {isLogin ? (
            <>
              <Typography
                textTransform={"capitalize"}
                fontWeight={700}
                fontSize={"30px"}
                letterSpacing={"0.2rem"}
                color={"white"}
                marginBottom={"25px"}
              >
                login
              </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  label="Username"
                  required
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={Username.value}
                  onChange={Username.changeHandler}
                  InputLabelProps={{ style: { color: "white" } }}
                />
                <TextField
                  label="Password"
                  required
                  fullWidth
                  variant="outlined"
                  type="password"
                  InputLabelProps={{ style: { color: "white" } }}
                  onChange={password.changeHandler}
                  value={password.value}
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
                <Typography
                  align="center"
                  textTransform={"uppercase"}
                  color={"white"}
                  fontWeight={"900"}
                  letterSpacing={"0.5rem"}
                  fullWidth
                  marginTop={"1rem"}
                >
                  or
                </Typography>
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  variant="text"
                  color="secondary"
                  style={{
                    color: "white",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                  onClick={register}
                >
                  Sign Up
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography
                align="center"
                textTransform={"uppercase"}
                color={"white"}
                fontWeight={"900"}
                letterSpacing={"0.5rem"}
                fontSize={"25px"}
                marginTop={"1rem"}
              >
                register
              </Typography>
              <form onSubmit={handleRegister}>
                <Stack
                  sx={{
                    width: "fit-content",
                    margin: "auto",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={avatar.preview}
                    sx={{
                      width: "8rem",
                      height: "8rem",
                      objectFit: "contain",
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "#fff",
                      backgroundColor: "#46464682",
                    }}
                    component="label"
                  >
                    <CameraAltIcon />
                    <input
                      style={{ display: "none" }}
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </IconButton>
                </Stack>
                <TextField
                  label="Name"
                  required
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{ style: { color: "white" } }}
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  label="Username"
                  required
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{ style: { color: "white" } }}
                  value={Username.value}
                  onChange={Username.changeHandler}
                />
                <TextField
                  label="Email-id"
                  required
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{ style: { color: "white" } }}
                  value={email.value}
                  onChange={email.changeHandler}
                />
                <TextField
                  label="Bio"
                  required
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  multiline
                  InputLabelProps={{ style: { color: "white" } }}
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  label="Create-Password"
                  required
                  fullWidth
                  variant="outlined"
                  type="password"
                  margin="normal"
                  InputLabelProps={{ style: { color: "white" } }}
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <TextField
                  label="Re-enter-Password"
                  required
                  fullWidth
                  variant="outlined"
                  type="password"
                  margin="normal"
                  InputLabelProps={{ style: { color: "white" } }}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  register
                </Button>
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  variant="text"
                  color="secondary"
                  style={{
                    color: "white",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                  onClick={back}
                >
                  back
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
