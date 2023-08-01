import React, { useEffect } from "react";
import Layout from "../../components/core/Layout";
import OrderProofCard from "../../components/core/Display/OrderProofCard";
import axios from "axios";
import { Stack } from "@mui/material";

const orderProofs = () => {
  const userId = "89bd2bfd-45b1-41c6-ad7b-58992a40dc2d";
  const [orderProof, setOrderProof] = React.useState();

  const getOrderProofByUserId = async () => {
    const url = `http://localhost:8004/api/v1/OrderProofs`;
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
    setOrderProof(data);
  };

  useEffect(() => {
    getOrderProofByUserId();
  }, []);

  return (
    <Layout>
      <Stack direction="row" alignItems="center" columnGap={2}>
        {orderProof?.map((item) => (
          <OrderProofCard orderProof={item} />
        ))}
      </Stack>
    </Layout>
  );
};

export default orderProofs;
