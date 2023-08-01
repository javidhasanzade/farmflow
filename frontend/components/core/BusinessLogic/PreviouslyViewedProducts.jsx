import React, { lazy, Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "../../../utils/Store";
import {
  Button,
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";

const ProductCard = lazy(() =>
  import("../../pageRelated/marketplace/ProductCard")
);

const PreviouslyViewedProducts = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/Catalog/products/recent`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      });
  }, []);

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
    <Stack
      direction="column"
      className=" min-h-fit p-5 border rounded-md w-full mt-6 mb-6"
    >
      <Typography variant="h5" className="mb-2" sx={{ color: "primary.main" }}>
        Previously viewed
      </Typography>

      <Grid container spacing={0.8} className="pb-5">
        {products?.map((product) => (
          <Grid item xs={4}>
            <ProductCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default PreviouslyViewedProducts;
