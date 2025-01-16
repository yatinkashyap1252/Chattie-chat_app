import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import moment from "moment";
import { CurvedButton, SearchField } from '../../components/styles/StyledComponents';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import { DoughnutChart, LineChart } from '../../components/specific/Chart';

const Dashboard = () => {
  const Appbar = (
    <Paper sx={{ width: '91%', padding: '2rem',margin:'2rem 3rem', borderRadius: '15px', overflow: 'hidden' }} elevation={5}>
      <Stack direction={'row'} spacing={"1rem"} alignItems={'center'} >
        <AdminPanelSettingsIcon sx={{ fontSize: '2.5rem' }} />
        <SearchField placeholder='Search here...' />
        <CurvedButton>Search</CurvedButton>
        <Box flexGrow={1} />
        <Typography textAlign={'center'} sx={{ display: { xs: 'none', lg: 'block' } }} >
          {moment().format("ddd,Do MMMM YYYY")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  )
  const Widget =
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={'2rem'} justifyContent={'space-between'} alignItems={'center'} margin={'2rem 0'} >
      <Widgets title={'Users'} value={5} icon={<PersonIcon sx={{ fontSize: '2rem' }} />} />
      <Widgets title={'Chats'} value={24} icon={<GroupIcon sx={{ fontSize: '2rem' }} />} />
      <Widgets title={'Messages'} value={345} icon={<MessageIcon sx={{ fontSize: '2rem' }} />} />
    </Stack>

  return (
    <AdminLayout>
      <Container component={'main'} >{Appbar}
        <Stack direction={'row'} flexWrap={'wrap'} marginTop={'2rem'} gap={'2rem'} justifyContent={'center'} >
          <Paper elevation={5} sx={{ borderRadius: '1rem', padding: '2rem 3rem', maxWidth: { xs: '47rem', lg: '62rem' }, width: '100%', }} >
            <Typography sx={{ fontSize: '30px', textAlign: 'center' }} >
              Last Messages
            </Typography>
            <LineChart value={[1, 25, 12, 34, 45, 20, 5]} />
          </Paper>
          <Paper elevation={5} sx={{ padding: '1rem', borderRadius: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '25rem', height: '25rem', width: { xs: '100%', sm: '50%' }, position: 'relative'}} >
            <DoughnutChart labels={["Single Chat", "Group Chat"]} value={[23, 45]} />
            <Stack position={'absolute'} justifyContent={'center'} alignItems={'center'} spacing={'0.5rem'} direction={'row'} height={'100%'} width={'100%'} >
              <GroupIcon />
              <Typography>VS</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        {Widget}
      </Container>
    </AdminLayout>
  )
}

const Widgets = ({ title, value, icon }) =>
  <Paper sx={{ width: '20rem', borderRadius: '1rem', padding: '2rem', margin: '2rem 0', background: 'linear-gradient(to bottom right,#2d2d2d,#767373)', color: 'white' }} elevation={5} >
    <Stack alignItems={'center'} spacing={'1rem'} >
      <Typography>{value}</Typography>
      <Stack alignItems={'center'} direction={'row'} spacing={'1rem'} >
        {icon}
        <Typography sx={{ fontSize: '25px', fontWeight: '700' }} >{title}</Typography>
      </Stack>
    </Stack>
  </Paper>

export default Dashboard