import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { DashboardData } from '../../consonants/sampledata'
import { Avatar, Stack } from '@mui/material'
import  moment  from "moment";

const columns=[{
  field:"id",
  headerName:"ID",
  headerClassName:'table-header',
  width:200,
},{
  field:"attachments",
  headerName:"Attachments",
  width:200,
  renderCell:(params)=>{
    const {attachments}=params.row
    return attachments.length>0?
    attachments.map(i=>{
      return <Avatar alt={i.name} src={i.url} />
    })
    :"No Attachments"
  }
},{
  field:"content",
  headerName:"Contents",
  width:400,
},{
  field:"senders",
  headerName:"Sent By",
  width:200,
  renderCell:(params)=>(
  <Stack direction={'row'} spacing={'1rem'} sx={{alignItems:'center'}} >
    <Avatar alt={params.row.senders.name} src={params.row.senders.avatar} ></Avatar>
    <span>{params.row.senders.name}</span>
  </Stack>)
},{
  field:"chat",
  headerName:"Chat",
  width:200,
},{
  field:"groupchat",
  headerName:"Group Chat",
  width:200,
},{
  field:"createdat",
  headerName:"Created at",
  width:200,
},]

const MessageManagement = () => {

  const [rows,setrows]=useState([])
  useEffect(()=>{
    setrows(DashboardData.messages.map((i)=>({...i,id:i._id,createdat:moment(i.createdat).format("MMMM Do YYYY,h:mm:ss a"),})))
  },[])
  return (
    <AdminLayout>
         <Table heading={"All Messages"} rows={rows} columns={columns} />
    </AdminLayout>
  )
}

export default MessageManagement