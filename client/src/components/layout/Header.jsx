import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { lingra } from "../../consonants/color";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import InfoIcon from '@mui/icons-material/Info';
// import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from "@mui/icons-material/Logout";
import NewGroup from "../specific/NewGroup";
import Search from "../specific/Search";
import Notification from "../specific/Notification";
import Loading from "./Loading";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { UserNotExist } from "../../redux/reducers/auth.js";
import { server } from "../../consonants/config.js";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc.js";
import { incrementNotification } from "../../redux/reducers/chat.js";

const search = lazy(() => import("../specific/Search"));
const notifications = lazy(() => import("../specific/Notification"));
const newgroup = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const { isSearch, isNotification,isNewGroup } = useSelector((state) => state.misc);
  const { notificationCount } = useSelector((state) => state.chat);
  // console.log(notificationCount);

  const navigate = useNavigate();
  // const [newgroup, setnewgroup] = useState(false);
  const dispatch = useDispatch();

  const handleMobile = () => {
    dispatch(setIsMobile(true));
    // console.log("mobile");
  };
  const addnewgroup = () => {
    dispatch(setIsNewGroup(true))
    // setnewgroup((prev) => !prev);
    console.log("group");
  };
  const searchbar = () => {
    dispatch(setIsSearch(true));
  };
  const navigategroup = () => {
    console.log("done");
    navigate("/groups");
  };
  const navigatelogin = async () => {
    // console.log("Logout initiated");
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(UserNotExist());
      toast.success(data.message || "Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong during logout"
      );
    }
  };

  const bell = () => {
    // console.log("bell");
    dispatch(setIsNotification(true));
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
        }}
        height={"4rem"}
      >
        <AppBar position="static" sx={{ background: lingra }}>
          <Toolbar>
            <Typography
              sx={{ display: { xs: "none", sm: "block" } }}
              variant="h4"
              fontWeight={750}
            >
              Chattie
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <Tooltip title="Menu">
                <MenuRoundedIcon onClick={handleMobile}></MenuRoundedIcon>
              </Tooltip>
            </Box>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box sx={{ gap: "15px", display: "flex" }}>
              <Tooltip
                title="Search here"
                style={{ width: "30px", height: "25px" }}
                sx={{
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.38)",
                    borderRadius: "50%",
                    padding: "1px",
                    transition: "0.5s",
                  },
                }}
              >
                <SearchIcon onClick={searchbar}></SearchIcon>
              </Tooltip>
              <Tooltip
                title="Manage Group"
                style={{ width: "30px", height: "25px" }}
                sx={{
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.38)",
                    borderRadius: "50%",
                    padding: "1px",
                    transition: "0.5s",
                  },
                }}
              >
                <GroupsIcon onClick={navigategroup} />
              </Tooltip>
              <Tooltip
                title="Add New Group"
                style={{ width: "30px", height: "25px" }}
                sx={{
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.38)",
                    borderRadius: "50%",
                    padding: "1px",
                    transition: "0.5s",
                  },
                }}
              >
                <AddIcon onClick={addnewgroup}></AddIcon>
              </Tooltip>
              <Tooltip
                title="Notification"
                style={{ width: "30px", height: "25px" }}
                sx={{
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.38)",
                    borderRadius: "50%",
                    padding: "1px",
                    transition: "0.5s",
                  },
                }}
              >
                <NotificationsIcon onClick={bell} />
              </Tooltip>
              <Tooltip
                title="Logout"
                style={{ width: "30px", height: "25px" }}
                sx={{
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.38)",
                    borderRadius: "50%",
                    padding: "1px",
                    transition: "0.5s",
                  },
                }}
              >
                <LogoutIcon onClick={navigatelogin} />
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {search && (
        <Suspense fallback={<Loading />}>
          <Search />
        </Suspense>
      )}
      {notifications && (
        <Suspense fallback={<Loading />}>
          <Notification />
        </Suspense>
      )}
      {newgroup && (
        <Suspense fallback={<Loading />}>
          <NewGroup />
        </Suspense>
      )}
    </>
  );
};

export default Header;
