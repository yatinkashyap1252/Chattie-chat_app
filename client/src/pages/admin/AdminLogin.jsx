import React from 'react'
import { Paper, Container, Typography, TextField, Button, Stack, Avatar, } from "@mui/material";
import { useInputValidation } from '6pp';

const isAdmin=true

const AdminLogin = () => {

    if(isAdmin) return <Navigate to='/admin/dashboard' ></Navigate>

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("submitHandler")
    }
    const secretKey = useInputValidation("")
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: "linear-gradient(to bottom,#ff5e5e, #7500ffdb)", }}>
            <Container component={'main'} maxWidth='xs' >
                <Paper elevation={15} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'normal', padding: 4, flexDirection: 'column', background: 'linear-gradient(to bottom,black,indigo,purple)', }}>
                    <Typography textTransform={'capitalize'} fullWidth fontWeight={700} fontSize={'30px'} letterSpacing={'0.2rem'} color={'white'} marginBottom={'25px'} >Admin login</Typography>
                    <form onSubmit={submitHandler}>
                        <TextField label='secret key' required fullWidth variant='outlined' type='password' InputLabelProps={{ style: { color: 'white' }, }} onChange={secretKey.changeHandler} value={secretKey.value} />
                        <Button sx={{ marginTop: '1rem' }} fullWidth alignItems='center' variant='contained' type='submit' color='primary'>login</Button>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default AdminLogin