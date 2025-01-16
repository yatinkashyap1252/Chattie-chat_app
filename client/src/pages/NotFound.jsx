import { Paper, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(to bottom,#ff5e5e, #7500ffdb)' }}>
            <Paper elevation={15} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', width: '1250px', background: '#ffffff15',borderRadius:'15px', backdropFilter: 'blur(25px)', zIndex: '10', boxShadow: '5px 5px 25px #000', }} >
                <Typography fullwidth fontSize={'100px'} fontWeight={'900'} fontStyle={'italic'} >404</Typography>
            </Paper>
        </div>
    )
}

export default NotFound