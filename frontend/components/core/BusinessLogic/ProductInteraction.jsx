import React, { useState } from "react";
import { useStateContext } from "../../../utils/Store";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";

const ProductInteraction = ({ product }) => {
  const stockAmount = product.quantity; // Replace with the actual amount in stock
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const { onAdd } = useStateContext();
  const handleAddQuantity = () => {
    if (currentQuantity === "") {
      setCurrentQuantity(1);
    } else {
      const quantity = parseInt(currentQuantity);
      if (quantity < stockAmount) {
        setCurrentQuantity(quantity + 1);
      }
    }
  };
  const handleMinusQuantity = () => {
    if (currentQuantity === "") {
      setCurrentQuantity(0);
    } else {
      const quantity = parseInt(currentQuantity);
      if (quantity > 1) {
        setCurrentQuantity(quantity - 1);
      }
    }
  };
  const handleInputQuantity = (event) => {
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
  };
  return (
    <div className="w-full p-4 h-72">
      <Stack
        direction="row"
        alignItems="center"
        columnGap={4}
        justifyContent="center"
        className="h-14"
      >
        <Button
          onClick={handleAddQuantity}
          className="w-24 h-full"
          variant="outlined"
        >
          Add +
        </Button>
        <TextField
          fullWidth
          placeholder={currentQuantity}
          value={currentQuantity}
          onChange={handleInputQuantity}
          label="Number of items"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">pcs : </InputAdornment>
            ),
          }}
        />
        <Button
          onClick={handleMinusQuantity}
          className="w-24 h-full"
          variant="outlined"
        >
          Remove -
        </Button>
      </Stack>
      <Stack alignItems="center" justifyContent="center" className="h-12 mt-3">
        <Button
          className="w-full h-full"
          style={{ background: "#101010", color: "#fafafa" }}
          variant="outlined"
          onClick={() => {
            onAdd(product, currentQuantity, "i", "catalog");
            setCurrentQuantity(0);
          }}
        >
          Add To cart
        </Button>
      </Stack>
    </div>
  );
};

export default ProductInteraction;
