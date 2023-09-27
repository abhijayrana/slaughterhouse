import React, { useState, useEffect, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material';

const Intern = () => {
    const theme = useTheme();
    return (
        <div>
            <Typography variant="h1" sx={{color: theme.palette.text.primary}}>Intern</Typography>
        </div>
    );
}

export default Intern;