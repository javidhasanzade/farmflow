import React, { lazy, Suspense, useState } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "../../../utils/Store";
import { Button, Grid, Pagination, Stack, Typography } from "@mui/material";

const ProductCard = lazy(() =>
  import("../../pageRelated/marketplace/ProductCard")
);

const Products = ({ products, pages, smallerThanLg }) => {
  //USING NEXT ROUTER
  const router = useRouter();

  //Getting the router query
  const { page } = router.query;

  const [pageInputValue, setPageInputValue] = React.useState(1);
  //GETTING SERVERSIDE PROPS FROM DB

  const { filterSearch, isDarkTheme } = useStateContext();

  const handleChange = (event, value) => {
    filterSearch({ page: value - 1 });
    setPageInputValue(value);
  };

  return (
    <div>
      <Grid container spacing={0.8} className="mb-6">
        {products.map((product) => (
          <Suspense fallback={<h1>The product card is loading...</h1>}>
            <Grid item xs={12} lg={4}>
              <div className="shadow-md flex items-center justify-center rounded-sm m-2 p-2">
                <ProductCard
                  key={product.id}
                  product={product}
                  vertical={smallerThanLg ? true : false}
                />
              </div>
            </Grid>
          </Suspense>
        ))}
      </Grid>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          width: "100%",
          padding: "0.45rem 0",
          backgroundColor: isDarkTheme
            ? "rgba(255,255,255,0.01)"
            : "rgba(0,0,0,0.01)",
          borderRadius: "1rem",
        }}
      >
        <Pagination
          color="primary"
          variant="outlined"
          count={pages}
          page={pageInputValue}
          onChange={handleChange}
          showFirstButton
          showLastButton
        />
      </Stack>
    </div>
  );
};

export default Products;
