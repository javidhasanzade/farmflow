import React, { useEffect, useState } from "react";
import Layout from "../components/core/Layout";
import MarketplaceHeadline from "../components/decorative/MarketplaceHeadline";
import Products from "../components/core/Display/Products";
import { Box, Grid, Hidden, Stack, useMediaQuery } from "@mui/material";
import Filters from "../components/pageRelated/marketplace/Filters";
import Categoriser from "../components/core/Navigation/Categoriser";
import ImageGallery from "../components/decorative/ImageGallery";
import BackgroundShapes from "../components/decorative/BackgroundShapes";

import { useRouter } from "next/router";
import LoadedComponent from "../components/core/Display/LoadedComponent";
import OurStatInfo from "../components/core/Display/OurStatInfo";
import { useStateContext } from "../utils/Store";
import useProducts from "../utils/UseProducts";
import PreviouslyViewedProducts from "../components/core/BusinessLogic/PreviouslyViewedProducts";

const marketplace = ({ theme }) => {
  const [info, setInfo] = useState();
  const { Load } = useProducts();
  let { smallerThanLg } = useStateContext();

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    Load(query, setInfo);
  }, [query]);

  const filterProps = {
    products: info?.products,
    countProducts: info?.countProducts,
    sellers: info?.sellers,
    cities: info?.cities,
    countries: info?.countries,
    lowestPrice: info?.lowestPrice,
    highestPrice: info?.highestPrice,
  };
  const productsProps = {
    products: info?.products,
    pages: info?.pages,
    smallerThanLg: smallerThanLg,
  };

  return (
    <Layout>
      {/* <BackgroundShapes /> */}
      <Box className="w-100 h-100 mb-3">
        <Grid container className="px-2" rowGap={2} columnGap={2}>
          {!smallerThanLg && (
            <Grid item lg={3} xl={3}>
              <Categoriser />
            </Grid>
          )}

          <Grid
            container
            item
            xs={12}
            lg={8.75}
            justifyContent="space-between"
            className="ml-auto"
          >
            <Grid item xs={12} md={8}>
              <MarketplaceHeadline />
            </Grid>
            <Grid item xs={12} md={3.75}>
              <ImageGallery isVertical={true} />
            </Grid>
            <Grid item xs={12} className="mt-2 p-2" alignItems="center">
              <OurStatInfo smallerThanLg={smallerThanLg} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <PreviouslyViewedProducts />
          </Grid>

          <Grid item xs={12} xl={6}>
            <LoadedComponent component={Filters} data={filterProps} />
          </Grid>
          <Grid item xs={12}>
            <LoadedComponent component={Products} data={productsProps} />
            {/* <Products products={props?.products} pages={props?.pages} /> */}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default marketplace;
