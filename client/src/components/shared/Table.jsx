import { Container, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const Table = ({rows,columns,heading,rowHeight=52}) => {
  return (
    <Container sx={{height:'100vh',}} >
        <Paper elevation={5} sx={{padding:'1rem 4rem',margin:'auto',width:'100%',overflow:'hidden',height:'100%',borderRadius:'1rem'}} >
            <Typography sx={{textAlign:'center',margin:'2rem',textTransform:'uppercase'}} variant='h4' >{heading}</Typography>
            <DataGrid rowHeight={rowHeight} rows={rows} columns={columns} style={{height:'80%'}} sx={{border:'none',".table_header":{bgcolor:'black',color:'white'}}} ></DataGrid>
        </Paper>
    </Container>
  )
}

export default Table