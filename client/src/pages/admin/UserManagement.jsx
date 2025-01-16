import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar } from '@mui/material'
import { DashboardData } from '../../consonants/sampledata'

const columns=[{
  field:"id",
  headerName:"ID",
  headerClassName:'table-header',
  width:80,
},{
  field:"Avatar",
  headerName:"Avatar",
  width:120,
  renderCell:(params)=>(<Avatar alt={params.row.name} src={params.row.avatar} />)
},{
  field:"name",
  headerName:"Name",
  width:200,
},{
  field:"username",
  headerName:"UserName",
  width:200,
},{
  field:"friends",
  headerName:"Friends",
  width:200,
},{
  field:"groups",
  headerName:"Groups",
  width:200,
},{
  field:"UpdatedAt",
  headerName:"Updated at",
  width:200,
},]

const UserManagement = () => {
  const [rows,setrows]=useState([])
  useEffect(()=>{
    setrows(DashboardData.users.map((i)=>({...i,id:i._id})))
  },[])
  return (
    <AdminLayout>
        <Table heading={"All Users"} rows={rows} columns={columns} />
    </AdminLayout>
  )
}

export default UserManagement