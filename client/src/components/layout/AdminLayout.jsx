import React, { useState } from 'react'
import { Box, Drawer, Grid, IconButton, Stack, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, Navigate, useLocation } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import GroupsIcon from '@mui/icons-material/Groups';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const admintab = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon />,
    }, {
        name: "Users",
        path: "/admin/user-management",
        icon: <SupervisedUserCircleIcon />,
    }, {
        name: "Chats",
        path: "/admin/chat-management",
        icon: <GroupsIcon />,
    }, {
        name: "Messages",
        path: "/admin/messages",
        icon: <MessageIcon />,
    },
];

const isAdmin=true

const AdminLayout = ({ children }) => {

    const [isMobile, setisMobile] = useState(false)
    const handleMobile = () => setisMobile(!isMobile)
    const handleClose = () => setisMobile(false)
    const Sidebar = ({ w = "100%" }) => {
    const location = useLocation()
    const logouthandler = () => {
        console.log("Logged out acc")
    }
    if(!isAdmin) return <Navigate to={"/admin"} ></Navigate>
        return (
            <Stack width={w} spacing={"3rem"} padding={"2rem"} direction={"column"} >
                <Typography textTransform={"capitalize"} variant='h4' >Admin</Typography>
                <Stack spacing={"2rem"}>
                    {
                        admintab.map((tab) => (
                            <Link key={tab.path} to={tab.path} 
                            sx={location.pathname===tab.path && {bgcolor:'red',color:'white'}}
                            >
                                <Stack direction={"row"} spacing={"2rem"} padding={"1.2rem"} color={'black'} borderRadius={"15px"} boxShadow={"0 0 10px #000 "} alignItems={"center"} >
                                    {tab.icon}
                                    <Typography >{tab.name}</Typography>
                                </Stack>
                            </Link>
                        ))
                    }
                    <Link>
                        <Stack direction={"row"} spacing={"2rem"} padding={"1.2rem"} borderRadius={"15px"} boxShadow={"0 0 10px #000 "} alignItems={"center"} onClick={logouthandler} >
                            <LogoutIcon />
                            <Typography>LogOut</Typography>
                        </Stack>
                    </Link>
                </Stack>
            </Stack>
        )
    }
    return (
        <Grid container minHeight={'100vh'}>
            <Box sx={{ display: { xs: 'block', md: 'none' }, top: '0.1rem', right: '0.1rem', position: 'fixed' }} onClick={handleMobile} >
                <IconButton>
                    {
                        isMobile ? <CloseIcon /> : <MenuIcon />
                    }
                </IconButton>
            </Box>
            <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: 'block' } }}>
                <Sidebar />
            </Grid>
            <Grid item md={8} xs={12} lg={9} sx={{ bgcolor: '#f5f5f0' }} >
                {children}
            </Grid>
            <Drawer open={isMobile} onClose={handleClose} >
                <Sidebar w={"50vw"} />
            </Drawer>
        </Grid>
    )
}

export default AdminLayout