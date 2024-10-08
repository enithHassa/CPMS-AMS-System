import React, { useState } from "react";
import List from '@mui/material/List';
import { Box, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import HomeIcon from "@mui/icons-material/Home"
import InfoIcon from "@mui/icons-material/Info"
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded"
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';

function HomeNavbar(){

    const [openMenu, setOpenMenu] = useState(false)
    const menuOptions = [
        {
            text: "Home",
            icon: <HomeIcon/>
        },

        {
            text: "About",
            icon: <InfoIcon/>
        },  

        {
            text: "Contact",
            icon: <PhoneRoundedIcon/>
        },

        {
            text: "Login",
            icon: <LoginIcon/>
        }
    ] 

    return(
        <nav className="home-navBar">
            <div className="logo-container">
                <p>AMS</p>
            </div>

            <div className="navbar-links-container">
                <a className="navbar-links-container-links" href="/">Home</a>
                <a className="navbar-links-container-links" href="/home">About</a>
                <a className="navbar-links-container-links" href="/home">Contact</a>        
                <a className="navbar-primary-button" href="/login">Login</a>
            </div>

            <div className="navbar-menu-container">
                <MenuIcon onClick = {() => setOpenMenu(true)}/>
            </div>

            <Drawer open={openMenu} onClose={()=> setOpenMenu(false)}
            anchor="right">
                <Box sx={{ width: 250 }}
                    role= "presentation"
                    onClick={() => setOpenMenu(false)}
                    onKeyDown={() => setOpenMenu(false)}
                >
                    <List>
                        {menuOptions.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </nav>
    )
}

export default HomeNavbar;