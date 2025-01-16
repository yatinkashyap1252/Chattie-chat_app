import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar, Stack } from '@mui/material'
import { DashboardData } from '../../consonants/sampledata'

const columns = [{
  field: "id",
  headerName: "ID",
  headerClassName: 'table-header',
  width: 80,
}, {
  field: "avatar",
  headerName: "Avatar",
  width: 120,
  renderCell: (params) => (<Avatar alt={params.row.name} src={params.row.avatar} />)
}, {
  field: "name",
  headerName: "Name",
  width: 300,
}, {
  field: "totalMembers",
  headerName: "Total Members",
  width: 200,
}, {
  field: "totalMessages",
  headerName: "Total Messages",
  width: 200,
}, {
  field: "creator",
  headerName: "Created by",
  width: 200,
  renderCell: (params) => (
    <Stack>
      <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
      <span>{params.row.creator.name}</span>
    </Stack>
  )
},]

const ChatManagement = () => {
  const [rows, setrows] = useState([])
  useEffect(() => {
    setrows(DashboardData.chats.map((i) => ({ ...i, id: i._id })))
  }, [])
  return (
    <AdminLayout>
      <Table heading={"All Chats"} rows={rows} columns={columns} />
    </AdminLayout>
  )
}

export default ChatManagement