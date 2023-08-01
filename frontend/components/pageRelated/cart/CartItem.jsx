import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../utils/Store";
import axios from "axios";
import useToken from "../../../utils/useToken";
import {
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FirebaseImage from "../../core/Display/FirebaseImage";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const CartItem = ({ cartProduct, delegat }) => {
  const [currentQuantity, setCurrentQuantity] = useState(0);

  const { onAdd } = useStateContext();

  const { user, token } = useToken();

  const loadItemQunatity = async () => {
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
    const products = response.data.items;
    if (!products || products.length === 0) {
      return;
    }
    const product = products.find(
      (item) => item.productId === cartProduct.productId
    );
    setCurrentQuantity(product.quantity);
  };

  useEffect(() => {
    loadItemQunatity();
  }, [user, token]);

  const handleAddQuantity = async () => {
    setCurrentQuantity(currentQuantity + 1);
    onAdd(cartProduct, 1, "i", "cart");
  };
  const handleMinusQuantity = async () => {
    if (currentQuantity > 0) {
      setCurrentQuantity(currentQuantity - 1);
      onAdd(cartProduct, currentQuantity, "d", "cart");
    }
  };
  const handleInputQuantity = async (event) => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/catalog/${cartProduct.productId}`
    );
    const product = response.data;

    event.preventDefault(); // Prevent the default behavior of the input field

    const value = event.target.value;
    if (value === "") {
      setCurrentQuantity(value);
    } else {
      const quantity = parseInt(value);
      if (!isNaN(quantity) && quantity > 0 && quantity <= stockAmount) {
        setCurrentQuantity(quantity);
      }
    }
    onAdd(product, currentQuantity);
  };

  const handleRemove = async () => {
    const confing = {
      params: {
        username: "test",
        productId: `${cartProduct.productId}`,
      },
    };
    axios
      .put("http://localhost:8001/api/v1/basket", {}, confing)
      .then((res) => {
        console.log("res", res.data);
      })
      .catch((err) => {
        console.log("error in request", err);
      });
    delegat();
  };

  const fullSizeProps = {
    className: "h-full w-full flex",
  };

  return (
    <Grid
      container
      className="h-44 w-full border rounded-md"
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item xs={6} md={3}>
        <div className="w-full h-44 p-2">
          <FirebaseImage url={cartProduct.imageUrl} />
        </div>
      </Grid>
      <Grid item xs={6} md={3}>
        <Stack className="product-heading">
          <Typography variant="h2" sx={{ color: "primary.main" }}>
            {cartProduct.productName}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "primary.main" }}>
            ID: {cartProduct.productId}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={6} md={3}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className="px-3 pt-2"
        >
          <IconButton
            onClick={handleAddQuantity}
            sx={{ color: "primary.dark" }}
          >
            <AddIcon />
          </IconButton>
          <TextField
            label="Number of items"
            placeholder={currentQuantity}
            value={currentQuantity}
            onChange={handleInputQuantity}
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">pcs : </InputAdornment>
              ),
            }}
          />

          <IconButton onClick={handleMinusQuantity}>
            <RemoveIcon />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item xs={6} md={3}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          columnGap={6}
          className="w-full"
        >
          <div className="product-total">
            <Typography variant="h4" sx={{ color: "primary.main" }}>
              Total price:{" "}
            </Typography>
            <Typography variant="h3" sx={{ color: "primary.main" }}>
              ${cartProduct.price * currentQuantity}
            </Typography>
          </div>
          <IconButton onClick={handleRemove}>
            <HighlightOffIcon />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CartItem;
