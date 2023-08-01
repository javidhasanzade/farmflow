import React from "react";
import Layout from "../../components/core/Layout";
import axios from "axios";
import { CircularProgress, Grid } from "@mui/material";
import dynamic from "next/dynamic";

//import ProcutImageGallery from "../../components/core/Display/ProcutImageGallery";
//import ProductData from "../../components/core/Display/ProductData";
//import ProductInteraction from "../../components/core/BusinessLogic/ProductInteraction";
// import required modules

const DynamicImageGallery = dynamic(
  () => import("../../components/core/Display/ProcutImageGallery"),
  {
    loading: () => <CircularProgress>Loading...</CircularProgress>,
  }
);
const DynamicProductData = dynamic(
  () => import("../../components/core/Display/ProductData"),
  {
    loading: () => <CircularProgress>Loading...</CircularProgress>,
  }
);
const DynamicProductInteraction = dynamic(
  () => import("../../components/core/BusinessLogic/ProductInteraction"),
  {
    loading: () => <CircularProgress>Loading...</CircularProgress>,
  }
);

const ProductPage = ({ product }) => {
  return (
    <Layout>
      <Grid container spacing={2} className="mt-10" columnGap={10}>
        <Grid item xs={5}>
          <DynamicProductData product={product} />
          <DynamicProductInteraction product={product} />
        </Grid>
        <Grid item xs={6}>
          <DynamicImageGallery images={product.imageFile} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/catalog/${id}`
  );
  const product = response.data;

  return {
    props: {
      product,
    },
  };
}

export default ProductPage;
