import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Stack } from "@mui/material";
import { DashboardData } from "../../consonants/sampledata";
import { useFetchData } from "6pp";
import { useError } from "../../hooks/hooks";
import Loading from "../../components/layout/Loading";
import { server } from "../../consonants/config";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 120,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar[1]} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 300,
  },
  {
    field: "groupChat",
    headerName: "GroupChat",
    width: 150,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    width: 200,
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    width: 200,
  },
  {
    field: "creator",
    headerName: "Created by",
    width: 200,
    renderCell: (params) => {
      const { name, avatar } = params.row.creator || {};

      return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Avatar alt={name} src={avatar} />
          <span>{name}</span>
        </div>
      );
    },
  },
];

const ChatManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/chats`,
    "chat-management"
  );

  const { chat } = data || {};
  useError([
    {
      isError: error,
      error: error,
    },
  ]);
  // console.log(data);

  const [rows, setrows] = useState([]);
  useEffect(() => {
    if (chat) {
      setrows(chat.map((i) => ({ ...i, id: i._id })));
    }
  }, [chat]);
  return (
    <AdminLayout>
      {loading ? (
        <Loading />
      ) : (
        <Table heading={"All Chats"} rows={rows} columns={columns} />
      )}
    </AdminLayout>
  );
};

export default ChatManagement;
