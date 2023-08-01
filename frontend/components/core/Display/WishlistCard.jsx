"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Checkbox, Divider, Stack, Typography } from "@mui/material";
import { useStateContext } from "../../../utils/Store";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HdrWeakIcon from "@mui/icons-material/HdrWeak";
import { loadPhotoFromFirebase } from "../../../utils/firebaseUtils";
import axios from "axios";
import useToken from "../../../utils/useToken";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

function TruncatedSeller({ text, limit }) {
  const truncatedText =
    text.length > limit ? `${text.substring(0, limit)}...` : text;

  return (
    <Typography variant="body1" component="h5" sx={{ color: "primary.main" }}>
      {truncatedText}
    </Typography>
  );
}

function TruncatedCountry({ country, city, limit }) {
  if (!country || !city) {
    return <CircularProgress fontSize="small" />;
  }
  const text = city.concat(",").concat(country);
  const truncatedText =
    text.length > limit ? `${text.substring(0, limit)}...` : text;

  return (
    <Typography
      variant="subtitle1"
      component="span"
      sx={{ color: "primary.main" }}
    >
      {truncatedText}
    </Typography>
  );
}

function TruncatedName({ text, smaller, truncate }) {
  const truncatedText =
    text.length > truncate ? `${text.substring(0, truncate)}...` : text;
  if (text.length > smaller) {
    return (
      <Typography variant="h6" component="h6" sx={{ color: "primary.main" }}>
        {truncatedText}
      </Typography>
    );
  } else {
    return (
      <Typography variant="h3" component="h3" sx={{ color: "primary.main" }}>
        {truncatedText}
      </Typography>
    );
  }
}

function getCardDateTime(date) {
  const reformattedDate = new Date(date);
  const str = reformattedDate.toDateString();
  return str;
}

const WishlistCard = ({ product }) => {
  const {
    id,
    name,
    image,
    price,
    seller,
    countInStock,
    description,
    postedOn,
    city,
    country,
  } = product;
  const { isDarkTheme } = useStateContext();

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchFile = async () => {
      const url = await loadPhotoFromFirebase(product.imageFile[0]);
      if (url != null) {
        setImageUrl(url);
      }
    };
    fetchFile();
  }, []);

  //Wishlist functionality
  const [savedToWishlist, setSavedToWishlist] = useState(true);

  const { user } = useToken();

  const wishlistHandler = () => {
    if (savedToWishlist && user?.email) {
      axios.delete(
        `http://localhost:8000/api/v1/Wishlist?userId=${user?.email}`,
        { data: product }
      );
    }
    if (!savedToWishlist && user?.email) {
      axios.post(
        `http://localhost:8000/api/v1/Wishlist?userId=${user?.email}`,
        product
      );
    }
    setSavedToWishlist(!savedToWishlist);
  };

  return (
    <Link href={`/products/${id}`} className="bg-green-400">
      <Stack
        sx={{
          bgcolor: "primary.lists",
        }}
        className="w-full h-96 rounded-md border p-2"
        direction="column"
        alignItems="center"
        justifyContent="center"
        // divider={
        //   <Divider orientation="vertical" flexItem>
        //     <HdrWeakIcon fontSize="small" sx={{ color: "primary.dark" }} />
        //   </Divider>
        // }
      >
        <div className="h-40 w-40">
          <Image
            src={imageUrl}
            width={300}
            height={300}
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </div>
        <div className="w-8/12">
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            className="px-1"
          >
            <div style={{ width: "fit-content" }}>
              <TruncatedName text={name} smaller={14} truncate={20} />
              <div
                style={{
                  marginLeft: "0.15rem",
                  borderBottom: "1px solid #e0fc00",
                }}
              ></div>
            </div>
            <Typography
              variant="h3"
              component="h3"
              sx={{ color: "primary.main" }}
            >
              ${price}
            </Typography>
          </Stack>
        </div>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocationOnIcon fontSize="medium" sx={{ color: "primary.dark" }} />
            <Typography
              variant="subtitle1"
              component="span"
              sx={{ color: "primary.main" }}
            >
              {<TruncatedCountry country={country} city={city} limit={30} />}
            </Typography>
          </Stack>
          <TruncatedSeller text={seller} limit={30} />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Checkbox
            icon={<FavoriteBorder fontSize="large" />}
            checkedIcon={<Favorite fontSize="large" />}
            onChange={wishlistHandler}
            className="mr-2"
            defaultChecked
          />
          <Typography
            variant="subtitle2"
            sx={{ color: "primary.main" }}
            className="transition-all"
          >
            {savedToWishlist ? "Saved as liked" : "Add to wishlist"}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
};

export default WishlistCard;
