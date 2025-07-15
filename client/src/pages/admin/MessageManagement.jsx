import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { DashboardData } from "../../consonants/sampledata";
import { Avatar, Stack } from "@mui/material";
import moment from "moment";
import { useFetchData } from "6pp";
import { server } from "../../consonants/config";
import { useError } from "../../hooks/hooks";
import Loading from "../../components/layout/Loading";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;
      return attachments.length > 0
        ? attachments.map((i) => {
            return <Avatar alt={i.name} src={i.url} />;
          })
        : "No Attachments";
    },
  },
  {
    field: "content",
    headerName: "Contents",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent By",
    width: 200,
    renderCell: (params) => {
      const sender = params.row.sender || {};
      const { name, avatar } = sender;

      return (
        <Stack direction="row" spacing={"1rem"} sx={{ alignItems: "center" }}>
          <Avatar alt={name || "Unknown"} src={avatar} />
          <span>{name || "Unknown"}</span>
        </Stack>
      );
    },
  },
  {
    field: "chat",
    headerName: "Chat",
    width: 200,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created at",
    width: 250,
  },
];

const MessageManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/messages`,
    "message-management"
  );
  // console.log(data);

  const { message } = data || {};
  useError([
    {
      iserror: error,
      error: error,
    },
  ]);

  const [rows, setrows] = useState([]);
  useEffect(() => {
    if (message) {
      setrows(
        message.map((i) => ({
          ...i,
          id: i._id,
          createdAt: moment(i.createdat).format("MMMM Do YYYY,h:mm:ss a"),
        }))
      );
    }
  }, [message]);
  return (
    <AdminLayout>
      {loading ? (
        <Loading />
      ) : (
        <Table heading={"All Messages"} rows={rows} columns={columns} />
      )}
    </AdminLayout>
  );
};

export default MessageManagement;
