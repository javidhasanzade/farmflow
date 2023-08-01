import React, { useEffect, useState } from "react";

import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import useProducts from "../utils/UseProducts";
import useToken from "../utils/useToken";
import Layout from "../components/core/Layout";
import { useStateContext } from "../utils/Store";
import WishlistCard from "../components/core/Display/WishlistCard";

const wishlist = () => {
  const [info, setInfo] = useState();
  const { loadWishlist } = useProducts();
  const { user } = useToken();

  // List of pages, that each contain at most 9 products, for pagination
  const [productPageList, setProductPageList] = useState([]);

  //Getting the router query
  const [pageInputValue, setPageInputValue] = React.useState(1);
  //GETTING SERVERSIDE PROPS FROM DB

  const { filterSearch, isDarkTheme } = useStateContext();

  const handleChange = (event, value) => {
    setPageInputValue(value);
  };

  useEffect(() => {
    if (user?.email) {
      loadWishlist(user.email, setInfo);
    }
  }, [, user]);

  useEffect(() => {
    if (info?.result) {
      const infoResult = info?.result;
      const transformedArray = [];
      for (let i = 0; i < infoResult.length; i += 9) {
        transformedArray.push(infoResult.slice(i, i + 9));
      }
      setProductPageList(transformedArray);
    }
  }, [info]);

  return (
    <Layout>
      <Box className="w-100 h-100">
        <Grid container className="px-2">
          <Grid item xs={12} sm={6} md={6}>
            {/* <Filters
              products={props?.products}
              countProducts={props?.countProducts}
              sellers={props?.sellers}
              cities={props?.cities}
              lowestPrice={props?.lowestPrice}
              highestPrice={props?.highestPrice}
            /> */}
          </Grid>
          <Grid item xs={12}>
            <div>
              <Stack
                className="w-full"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{ color: "primary.main" }}
                >
                  Here are your liked products
                </Typography>
              </Stack>
              <Grid
                container
                className="mb-6 w-full"
                alignItems="center"
                justifyContent="center"
                rowGap={2}
                columnGap={2}
              >
                {productPageList[pageInputValue - 1]?.length > 0 &&
                  productPageList[pageInputValue - 1].map((product) => (
                    <Grid item xs={3}>
                      <WishlistCard key={product.id} product={product} />
                    </Grid>
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
                  count={info?.pages}
                  page={pageInputValue}
                  onChange={handleChange}
                  showFirstButton
                  showLastButton
                />
              </Stack>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default wishlist;
