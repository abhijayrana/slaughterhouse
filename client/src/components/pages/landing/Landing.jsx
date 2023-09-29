import React from 'react';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';

const Landing = () => {
    const theme = useTheme();

    return (
        <Box sx={{ background: theme.palette.landing.gradients.primaryGradient, py: 8, width: "100%"}}>
            <Container maxWidth="sm" sx={{}}>
                <Typography 
                    variant="h2" 
                    align="center" 
                    sx={{ color: "#fff" }} 
                    gutterBottom
                    
                >
                    Welcome to Slaughterhouse
                </Typography>
            </Container>
        </Box>
    );
};

export default Landing;
