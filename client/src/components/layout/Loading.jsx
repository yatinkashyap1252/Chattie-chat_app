import { Grid, Skeleton, Stack } from '@mui/material'
import { Box, keyframes } from "@mui/material";

import React from 'react'

const Loading = () => {
    return (
        <>
            <Grid container height={'calc(100vh-4rem)'} spacing={'1rem'} >
                <Grid item sm={4} md={3} sx={{ display: { xs: 'none', sm: 'block' }, }} height={'100vh'}>
                    <Skeleton variant='rectangular' height={'100vh'} />
                </Grid>
                <Grid item xs={12} sm={8} md={5} lg={6} height={'100%'}  >
                    <Stack spacing={'1rem'}>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Skeleton variant='rounded' height={'5rem'} key={index} />
                        ))}
                    </Stack>
                </Grid>
                <Grid item md={4} lg={3} height={'100%'} sx={{ display: { xs: 'none', md: 'block' } }} >
                    <Skeleton variant='rectangular' height={'100vh'} />
                </Grid>
            </Grid>
        </>
    )
}

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

export const TypingLoader = () => {
  return (
    <Box 
      display="flex" 
      gap="4px" 
      justifyContent="center" 
      alignItems="center"
    >
      <Box
        component="span"
        sx={{
          width: "8px",
          height: "8px",
          backgroundColor: "#007bff",
          borderRadius: "50%",
          animation: `${bounce} 1.4s infinite ease-in-out`,
          animationDelay: "-0.32s",
        }}
      ></Box>
      <Box
        component="span"
        sx={{
          width: "8px",
          height: "8px",
          backgroundColor: "#007bff",
          borderRadius: "50%",
          animation: `${bounce} 1.4s infinite ease-in-out`,
          animationDelay: "-0.16s",
        }}
      ></Box>
      <Box
        component="span"
        sx={{
          width: "8px",
          height: "8px",
          backgroundColor: "#007bff",
          borderRadius: "50%",
          animation: `${bounce} 1.4s infinite ease-in-out`,
        }}
      ></Box>
    </Box>
  );
};

export default Loading