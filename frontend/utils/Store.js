import axios from "axios";
import { useRouter } from "next/router";
import React, { createContext, useContext, useState, useEffect } from "react";
import useToken from "./useToken";
import { createTheme, responsiveFontSizes, useMediaQuery } from "@mui/material";
import { darkTheme } from "../components/decorative/Theming/DarkTheme";
import { lightTheme } from "../components/decorative/Theming/LightTheme";

const Context = createContext();

export const StateContext = ({ children }) => {
  //Value States
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [userId, setUserId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  let theme = createTheme(isDarkTheme ? darkTheme : lightTheme);
  theme = responsiveFontSizes(theme);
  let smallerThanLg = useMediaQuery(theme.breakpoints.down("lg"));

  //Users
  const { user, token } = useToken();

  const onLoadCartItems = async () => {
    if (!user || !token) {
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `http://localhost:8001/api/v1/basket/${user.email}`,
      config
    );
    const data = response.data;
    let amountOfItems = 0;
    data.items.forEach((element) => {
      amountOfItems += element.quantity;
    });
    setTotalQuantities(amountOfItems);
  };

  useEffect(() => {
    onLoadCartItems();
  }, [user, token]);

  const onAdd = (product, quantity, action, type) => {
    if (!user || !token) {
      return;
    }
    let data = product;
    if (type === "catalog") {
      data = {
        quantity: quantity,
        imageUrl: product.imageFile[0],
        price: product.price,
        productId: product.id,
        productName: product.name,
      };
    }

    if (action === "i") {
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities + quantity
      );
      product.quantity = quantity;
    } else if (action === "d") {
      if (quantity - 1 >= 0) {
        setTotalQuantities(quantity - 1);
        product.quantity = quantity - 1;
      }
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        username: user.email,
        action: `${action}`,
      },
    };
    axios
      .post("http://localhost:8001/api/v1/basket", data, config)
      .then((res) => {
        console.log("res", res.data);
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  const cartClickHandler = () => {
    setShowCart(!showCart);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        totalQuantities,
        totalPrice,
        userId,
        isDarkTheme,
        smallerThanLg,
        setIsDarkTheme,
        setShowCart,
        setTotalQuantities,
        setTotalPrice,
        setUserId,
        cartClickHandler,
        onAdd,
        theme,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
