import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Box,
  Button,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import moment from "moment";
import {
  CurvedButton,
  SearchField,
} from "../../components/styles/StyledComponents";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import { DoughnutChart, LineChart } from "../../components/specific/Chart";
import { useFetchData } from "6pp";
import { server } from "../../consonants/config";
import Loading from "../../components/layout/Loading";
import { useError } from "../../hooks/hooks";

const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/stats`,
    "dashboard-stats"
  );

  const { stats } = data || {};
  useError([{
    isError: error,
    error:error
  }]);

  const Appbar = (
    <Paper
      sx={{
        width: "91%",
        padding: "2rem",
        margin: "2rem 3rem",
        borderRadius: "15px",
        overflow: "hidden",
      }}
      elevation={5}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "2.5rem" }} />
        <SearchField placeholder="Search here..." />
        <CurvedButton>Search</CurvedButton>
        <Box flexGrow={1} />
        <Typography
          textAlign={"center"}
          sx={{ display: { xs: "none", lg: "block" } }}
        >
          {moment().format("ddd,Do MMMM YYYY")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );
  const Widget = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widgets
        title={"Users"}
        value={stats?.TotalUsers||0}
        icon={<PersonIcon sx={{ fontSize: "2rem" }} />}
      />
      <Widgets
        title={"Chats"}
        value={stats?.TotalChats||0}
        icon={<GroupIcon sx={{ fontSize: "2rem" }} />}
      />
      <Widgets
        title={"Messages"}
        value={stats?.TotalMessages||0}
        icon={<MessageIcon sx={{ fontSize: "2rem" }} />}
      />
    </Stack>
  );

  // console.log(data);

  return loading ? (
    <Skeleton />
  ) : (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          marginTop={"2rem"}
          gap={"2rem"}
          justifyContent={"center"}
        >
          <Paper
            elevation={5}
            sx={{
              borderRadius: "1rem",
              padding: "2rem 3rem",
              maxWidth: { xs: "47rem", lg: "62rem" },
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: "30px", textAlign: "center" }}>
              Last Messages
            </Typography>
            <LineChart value={stats?.messagesChart||[]} />
          </Paper>
          <Paper
            elevation={5}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "25rem",
              height: "25rem",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
            }}
          >
            <DoughnutChart
              labels={["Single Chat", "Group Chat"]}
              value={[stats?.TotalChats-stats?.TotalGroupChats||0, stats?.TotalGroupChats||0]}
            />
            <Stack
              position={"absolute"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              direction={"row"}
              height={"100%"}
              width={"100%"}
            >
              <GroupIcon />
              <Typography>VS</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        {Widget}
      </Container>
    </AdminLayout>
  );
};

const Widgets = ({ title, value, icon }) => (
  <Paper
    sx={{
      width: "20rem",
      borderRadius: "1rem",
      padding: "2rem",
      margin: "2rem 0",
      background: "linear-gradient(to bottom right,#2d2d2d,#767373)",
      color: "white",
    }}
    elevation={5}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography>{value}</Typography>
      <Stack alignItems={"center"} direction={"row"} spacing={"1rem"}>
        {icon}
        <Typography sx={{ fontSize: "25px", fontWeight: "700" }}>
          {title}
        </Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
