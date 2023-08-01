import React, { useEffect, useState } from "react";
import Layout from "../components/core/Layout";
import {
  Box,
  Card,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StatCard from "../components/pageRelated/dashboard/StatCard";
import StoreIcon from "@mui/icons-material/Store";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CreateProductForm from "../components/pageRelated/dashboard/CreateProductForm";
import ProductCard from "../components/pageRelated/marketplace/ProductCard";
import ProductPreviewCard from "../components/decorative/ProductPreviewCard";
import YourProducts from "../components/pageRelated/dashboard/YourProducts";
import useToken from "../utils/useToken";
import axios from "axios";
import Orders from "../components/core/BusinessLogic/Orders";
import OrdersForSeller from "../components/core/BusinessLogic/OrdersForSeller";

const dashboard = (props) => {
  const countOfItems = 0;
  const [currentItems, setCurrentItems] = useState();
  const [createProductWindowOpen, setCreateProductWindowOpen] = useState(false);
  const [orders, setOrders] = useState(null);
  const [ordersForSeller, setOrdersForSeller] = useState(null);
  const { user } = useToken();

  const hadnleCreateProductWindow = () => {
    setCreateProductWindowOpen(!createProductWindowOpen);
  };

  useEffect(() => {
    if (user?.name) {
      loadYourProducts();
      loadOrders();
    }
  }, [user]);

  const loadYourProducts = async () => {
    const test = `http://localhost:8000/api/v1/Catalog/GetProductsBySeller/${user.email}?orderBy=N&page=0`;
    const response = await axios.get(test);
    console.log(response);
    const data = response.data;
    setCurrentItems([...data]);
  };
  const loadOrders = async () => {
    const ordersLink = `http://localhost:8004/api/v1/Orders/${user.email}`;
    const ordersForSellerLink = `http://localhost:8004/api/v1/Orders/GetOrdersForSeller/${user.email}`;
    const ordersResponse = await axios.get(ordersLink);
    const ordersForSellerResponse = await axios.get(ordersForSellerLink);
    setOrders(ordersResponse.data);
    setOrdersForSeller(ordersForSellerResponse.data);
  };

  const mainFrame = () => {
    if (createProductWindowOpen) {
      return <CreateProductForm windowHandler={hadnleCreateProductWindow} />;
    } else {
      if (currentItems) {
        return <YourProducts products={currentItems} />;
      }
    }
  };

  if (!user) {
    return (
      <Layout>
        <CircularProgress fontSize="large" />
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid container rowSpacing={10} columnSpacing={4.2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={4}
          >
            <StatCard
              icon={<StoreIcon fontSize="large" />}
              statName="Current listings"
              statValue={210}
            />
            <StatCard
              icon={<DoneAllIcon fontSize="large" />}
              statName="Completed orders"
              statValue={52}
            />
            <StatCard
              icon={<LocalShippingIcon fontSize="large" />}
              statName="Average shipping time"
              statValue={"2 days"}
            />
            <StatCard
              icon={<CircularProgress variant="determinate" value={72} />}
              statName="Customer satisfaction"
              statValue={"72%"}
            />
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <Paper sx={{ width: "100%", height: "100%" }}>{mainFrame()}</Paper>
        </Grid>
        <Grid item xs={2.8}>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={0.3}
            sx={{
              height: "25rem",
              padding: "0.5rem",
              bgcolor: "primary.lists",
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="h5"
              component="span"
              sx={{ color: "primary.main" }}
            >
              Add post
            </Typography>
            <IconButton onClick={hadnleCreateProductWindow}>
              <AddIcon variant="outlined" fontSize="large" />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <Paper sx={{ width: "100%", height: "100%" }}>
            <OrdersForSeller orders={ordersForSeller} />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper sx={{ width: "100%", height: "100%" }}>
            <Orders orders={orders} />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default dashboard;
