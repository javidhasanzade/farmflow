import React, { useEffect, useState } from "react";
import useProducts from "../../utils/UseProducts";
import { useRouter } from "next/router";
import Layout from "../../components/core/Layout";
import { Box, Grid } from "@mui/material";
import Filters from "../../components/pageRelated/marketplace/Filters";
import Products from "../../components/core/Display/Products";
import LoadedComponent from "../../components/core/Display/LoadedComponent";

const CategoryDetails = (props) => {
  const [info, setInfo] = useState();
  const { Load } = useProducts();

  useEffect(() => {
    console.log(props.query);
    Load(props.query, setInfo);
  }, []);

  const productsProps = {
    products: info?.products,
    pages: info?.pages,
  };

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
            <LoadedComponent component={Products} data={productsProps} />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export async function getServerSideProps({ query, req, res }) {
  return {
    props: {
      query,
    },
  };
}

export default CategoryDetails;
