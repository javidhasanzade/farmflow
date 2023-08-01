import { Grid } from "@mui/material";
import React from "react";
import YourProductCard from "./YourProductCard";

const YourProducts = ({ products }) => {
  return (
    <Grid container spacing={0.8} className="mb-6 p-4">
      {products.map((product) => (
        <Grid item xs={12}>
          <YourProductCard key={product.id} product={product} scale={0.9} />
        </Grid>
      ))}
    </Grid>
  );
};

export default YourProducts;
