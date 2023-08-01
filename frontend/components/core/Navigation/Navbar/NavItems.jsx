import { Badge, Grid, Stack, Typography, styled } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductSearcher from "../../Inputs/ProductSearcher";
import MaterialUISwitch from "../../Inputs/MaterialUISwitch";
import NavBarIcon from "../../Display/Icons/NavBarIcon";
import LoginIcon from "@mui/icons-material/Login";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MessageIcon from "@mui/icons-material/Message";
import StoreIcon from "@mui/icons-material/Store";

import { useStateContext } from "../../../../utils/Store";
import useToken from "../../../../utils/useToken";
import axios from "axios";
import UserProfileButton from "../../Inputs/UserProfileButton";

const Nav = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#262626" : "#fff",
}));

const NavItems = ({ layoutFor }) => {
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [userStateElement, setUserStateElement] = useState();
  const { token, user } = useToken();
  const { isDarkTheme, setIsDarkTheme } = useStateContext();

  const themeChangeHandler = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const getQuantities = async (user) => {
    const response = await axios.get(
      `http://localhost:8001/api/v1/basket/${user?.name}`
    );
    setTotalQuantities(response.data.totalQuantity);
  };

  useEffect(() => {
    if (!token) {
      setUserStateElement(
        <NavBarIcon
          desktop={desktop}
          icon={<LoginIcon fontSize="medium" />}
          text="Login"
          linkTo="/login"
        />
      );
    } else {
      setUserStateElement(
        <NavBarIcon
          desktop={desktop}
          icon={<UserProfileButton />}
          text="Profile"
          linkTo="/profile"
        />
      );
      getQuantities(user);
    }
  }, [token, user]);

  const desktop = layoutFor === "desktop";

  return (
    <Nav
      container
      className={`${
        desktop ? "absolute top-0 left-0 h-16 bg-green-200" : "h-screen"
      } w-full z-50`}
      alignItems="center"
    >
      <Grid item xs={12} lg={4} className={`${desktop ? "h-full" : "h-fit"}  `}>
        <Link href="/marketplace">
          <Typography
            variant="h4"
            component="h4"
            sx={{
              width: "fit-content",
              color: desktop ? "primary.contrastText" : "primary.main",
            }}
            className={`${
              desktop ? "mt-3 ml-10" : "mx-auto mt-5 mb-2"
            } font-bold`}
          >
            FarmFlow
          </Typography>
        </Link>
      </Grid>
      {desktop && (
        <Grid
          item
          xs={12}
          lg={4}
          justifyContent="center"
          alignItems="center"
          className="h-full"
        >
          <ProductSearcher />
        </Grid>
      )}
      <Grid item xs={12} lg={4} alignItems="center" className="h-full">
        <Stack
          direction={desktop ? "row" : "column"}
          alignItems="center"
          gap={desktop ? 2 : 0.45}
          justifyContent="end"
          className={`${desktop ? "" : "w-screen"}`}
        >
          <MaterialUISwitch onChange={themeChangeHandler} />

          {!desktop && (
            <NavBarIcon
              desktop={desktop}
              icon={<StoreIcon fontSize="medium" />}
              linkTo="/marketplace"
              text="Marketplace"
            />
          )}
          <NavBarIcon
            desktop={desktop}
            icon={<DashboardCustomizeIcon fontSize="medium" />}
            linkTo="/dashboard"
            text="Dashboard"
          />
          <NavBarIcon
            desktop={desktop}
            icon={
              <Badge
                badgeContent={totalQuantities}
                overlap="circular"
                color="primary"
                max={20}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <ShoppingCartIcon fontSize="medium" />
              </Badge>
            }
            linkTo="/cart"
            text="Cart"
          />
          <NavBarIcon
            desktop={desktop}
            icon={<MessageIcon />}
            linkTo="/chat"
            text="Chat"
          />
          <NavBarIcon
            desktop={desktop}
            icon={<BookmarkIcon fontSize="medium" />}
            text="Wishlist"
            linkTo="/wishlist"
          />
          {userStateElement}
        </Stack>
      </Grid>
    </Nav>
  );
};

export default NavItems;
