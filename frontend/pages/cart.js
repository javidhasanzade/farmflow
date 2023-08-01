import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/core/Layout";
import CartItem from "../components/pageRelated/cart/CartItem";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import useToken from "../utils/useToken";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const cart = () => {
  const [currentCartItems, setCurrentCartItems] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user, token } = useToken();

  const triggerRefresh = () => {
    getCartItems();
  };

  const getCartItems = async () => {
    if (!user || !token) {
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(token);
    const response = await axios.get(
      `http://localhost:8001/api/v1/Basket/${user.email}`,
      config
    );
    const data = response.data;
    console.log(data);
    setTotalPrice(data.totalPrice);
    const updatedCartItems = data.items.map((cartProduct) => {
      return (
        <CartItem
          delegat={triggerRefresh}
          key={cartProduct.productId}
          cartProduct={cartProduct}
        />
      );
    });
    setCurrentCartItems(updatedCartItems);
  };

  const checkoutComponent = () => {
    return (
      <Stack
        sx={{ width: "100%" }}
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={4}
        className="mt-4"
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Typography
            variant="subtitle1"
            component="span"
            sx={{ color: "primary.main" }}
          >
            Total Price :
          </Typography>
          <Typography
            variant="h5"
            component="span"
            sx={{ color: "primary.main" }}
          >
            ${totalPrice}
          </Typography>
        </Stack>
        <Link href="/checkout">
          <Paper elevation={2} sx={{ p: 0.5 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <CreditCardIcon fontSize="large" />
              <Typography
                variant="h5"
                component="span"
                sx={{ color: "primary.main" }}
              >
                CHECKOUT
              </Typography>
            </Stack>
          </Paper>
        </Link>
      </Stack>
    );
  };

  const cartItemsComponent = () => {
    if (!currentCartItems) {
      return (
        <Stack direction="row" alignItems="center">
          <Typography
            variant="h2"
            component="h2"
            sx={{ color: "primary.main" }}
          >
            Cart items are being loaded...
          </Typography>
          <CircularProgress fontSize="large" sx={{ color: "primary.dark" }} />
        </Stack>
      );
    } else if (currentCartItems.length == 0) {
      return (
        <Stack
          sx={{ width: "100%" }}
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={4}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{ color: "primary.main" }}
          >
            Your shopping cart is empty
          </Typography>
          <ShoppingCartIcon sx={{ color: "primary.dark", fontSize: "12rem" }} />
          <Link href="/marketplace">
            <Button>Go to market</Button>
          </Link>
        </Stack>
      );
    } else {
      return currentCartItems;
    }
  };

  useEffect(() => {
    getCartItems();
  }, [user, token]);

  if (!user) {
    return (
      <Layout>
        <Box className="cart-container" sx={{ bgcolor: "primary.boxes" }}>
          <CircularProgress
            fontSize="large"
            sx={{ color: "primary.dark", fontSize: "12rem" }}
          />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box className="cart-container" sx={{ bgcolor: "primary.boxes" }}>
        <div className="sub-container">{cartItemsComponent()}</div>
        {checkoutComponent()}
      </Box>
    </Layout>
  );
};

export default cart;
