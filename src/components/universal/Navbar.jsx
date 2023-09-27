import React from "react";
import { useState } from "react";
import { AppBar, Button, Toolbar, Typography, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Navbar = (props) => {
    const {toggleMode, mode} = props;
    const theme = useTheme();

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: theme.palette.background.default,
            }}
            elevation={0}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button 
                    color="inherit" 
                    href="/" 
                    sx={{color: theme.palette.text.primary}}
                >
                    <Typography variant="h6">Slaughterhouse</Typography>
                </Button>
                <div sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button 
                        color="inherit" 
                        href="/programs" 
                        sx={{color: theme.palette.text.primary}}
                    >
                        Programs
                    </Button>
                    <Button 
                        color="inherit" 
                        onClick={toggleMode}
                        sx={{color: theme.palette.text.primary}}
                    >
                        {mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};


export default Navbar;
