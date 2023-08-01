import { useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBarIcon from "../../Display/Icons/NavBarIcon";

import LoginIcon from "@mui/icons-material/Login";
import useToken from "../../../../utils/useToken";
import UserProfileButton from "../../Inputs/UserProfileButton";
import axios from "axios";

import { AppBar, Toolbar, IconButton, Drawer, List } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavItems from "./NavItems";
import CloseIcon from "@mui/icons-material/Close";
import ProductSearcher from "../../Inputs/ProductSearcher";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar className="bg-green-200">
          {isSmallScreen ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleMenuOpen}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <div className="m-auto mb-3">
                <ProductSearcher />
              </div>
            </>
          ) : (
            <NavItems layoutFor="desktop" />
          )}
        </Toolbar>
      </AppBar>
      {/* Hamburger menu */}
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={handleMenuClose}
        sx={{ height: "100vh" }}
      >
        <IconButton
          className="absolute right-6 top-3 z-[9999]"
          edge="end"
          color="inherit"
          onClick={handleMenuClose}
          aria-label="menu"
        >
          <CloseIcon />
        </IconButton>
        <List sx={{ p: 0, height: "100vh", overflow: "hidden" }}>
          <NavItems layoutFor="mobile" />
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
