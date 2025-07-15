import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar } from "@mui/material";
import moment from "moment"; // Import moment
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
    field: "Avatar",
    headerName: "Avatar",
    width: 120,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "username",
    headerName: "UserName",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
  },
];

const UserManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/users`,
    "user-management"
  );

  const { user } = data || {}; // `user` should be an array, not `[]`

  useError([
    {
      isError: error,
      error: error,
    },
  ]);

  const [rows, setrows] = useState([]);

  useEffect(() => {
    if (user && Array.isArray(user)) {
      const formatted = user.map((i) => ({
        ...i,
        id: i._id,
        createdAt: moment(i.createdAt).format("YYYY-MM-DD HH:mm"),
        updatedAt: moment(i.updatedAt).format("YYYY-MM-DD HH:mm"),
      }));
      setrows(formatted);
    }
  }, [user]);

  return (
    <AdminLayout>
      {loading ? (
        <Loading />
      ) : (
        <Table heading={"All Users"} rows={rows} columns={columns} />
      )}
    </AdminLayout>
  );
};

export default UserManagement;