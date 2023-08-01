import { Box, Checkbox, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import Link from "next/link";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import axios from "axios";
import useToken from "../../../utils/useToken";

const formatDate = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

const ProductData = ({ product }) => {
  const [savedToWishlist, setSavedToWishlist] = useState(false);

  const { user } = useToken();

  const wishlistHandler = () => {
    if (savedToWishlist && user?.email) {
      axios.delete(
        `http://localhost:8000/api/v1/Wishlist?userId=${user?.email}`,
        { data: product }
      );
    }
    setSavedToWishlist(!savedToWishlist);
  };

  useEffect(() => {
    if (savedToWishlist && user?.name) {
      axios.post(
        `http://localhost:8000/api/v1/Wishlist?userId=${user?.email}`,
        product
      );
    }
  }, [savedToWishlist, user]);

  return (
    <Stack direction="row" columnGap={5} className="items-center p-4 w-full">
      <Stack direction="column">
        <Stack direction="row" alignItems="center">
          <Typography
            variant="h1"
            sx={{ color: "primary.main" }}
            className="mr-4"
          >
            {product.name}
          </Typography>
          <Checkbox
            icon={<FavoriteBorder fontSize="large" />}
            checkedIcon={<Favorite fontSize="large" />}
            onChange={wishlistHandler}
            className="mr-2"
          />
          <Typography
            variant="subtitle2"
            sx={{ color: "primary.main" }}
            className="transition-all"
          >
            {savedToWishlist ? "Saved as liked" : "Add to wishlist"}
          </Typography>
        </Stack>

        <Box
          sx={{ bgcolor: "primary.contrastBox" }}
          className="flex items-center p-1"
        >
          <Typography variant="h3" sx={{ color: "primary.contrastText" }}>
            price : ${product.price}
          </Typography>
        </Box>
        <Stack alignItems="center" direction="row" className="mt-5">
          <PlaceIcon
            fontSize="large"
            sx={{ color: "primary.dark" }}
            className="mr-2"
          />
          <Typography variant="h4" sx={{ color: "primary.main" }}>
            {product.country},
          </Typography>
          <Typography variant="h4" sx={{ color: "primary.main" }}>
            &nbsp;{product.city}.
          </Typography>
        </Stack>
        <Typography variant="h4" sx={{ color: "primary.main" }}>
          Posted on: {formatDate(product.postedOn)}
        </Typography>
        <Divider className="mt-5" />
        <div className="p-2 flex items-center">
          <Typography variant="subtitle1" sx={{ color: "primary.main" }}>
            Description:&nbsp;
            {product.description}
          </Typography>
        </div>
        <Box
          className="flex items-center justify-center p-2"
          sx={{ bgcolor: "primary.boxes" }}
        >
          <Link href={`/profile/${product.seller}`}>
            <Typography variant="h5" sx={{ color: "primary.main" }}>
              {product.seller}
            </Typography>
          </Link>
        </Box>
        <Grid container className="mt-4 p-2" direction="row">
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ color: "primary.main" }}>
              Additional info:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle2" sx={{ color: "primary.main" }}>
                Category: &nbsp;
              </Typography>
              <Link
                href={`/Categories/${product.category}`}
                className="text-green-500"
              >
                <Typography variant="subtitle1">{product.category}</Typography>
              </Link>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle2" sx={{ color: "primary.main" }}>
                Unit: &nbsp;
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "primary.main" }}>
                {product.unit}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle2" sx={{ color: "primary.main" }}>
                Available in stock: &nbsp;
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "primary.main" }}>
                {product.quantity}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle2" sx={{ color: "primary.main" }}>
                Product id: &nbsp;
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "primary.main" }}>
                {product.id}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default ProductData;
