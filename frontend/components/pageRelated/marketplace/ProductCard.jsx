"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Divider, Stack, Typography } from "@mui/material";
import { useStateContext } from "../../../utils/Store";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HdrWeakIcon from "@mui/icons-material/HdrWeak";
import { loadPhotoFromFirebase } from "../../../utils/firebaseUtils";

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
      <Typography variant="h3" component="h3" sx={{ color: "primary.main" }}>
        {truncatedText}
      </Typography>
    );
  } else {
    return (
      <Typography variant="h2" component="h2" sx={{ color: "primary.main" }}>
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

const ProductCard = ({ product }, vertical) => {
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

  /* --- CUSTOMIZATION --- */
  // --- Sizing
  const scaleTotal = 1.25; // for scaling-up the card

  // --- Colors
  const cardContentColor = isDarkTheme ? "#b4d3b2" : "#b4d3b2"; // for changing bottom ("content") color
  const cardBorderColor = isDarkTheme
    ? "rgba(255,255,255,0.3)"
    : "rgba(0,0,0,0.3)"; // for changing bottom ("content") color
  const mainBackgroundColor = isDarkTheme ? "#262626" : "#fff"; //for making cut-out effect

  // --- Rating Stars
  const defaultStarPictureSource = isDarkTheme ? "/Star 4.svg" : "/Star 4.svg"; // Star 5 can be added, to your taste
  const activeStarPictureSource = "/Star 3.svg";

  // --- Shadows
  const shadowQuantifier = 0.35;
  /* --- CUSTOMIZATION --- */

  return (
    <Link href={`/products/${id}`}>
      <Stack
        sx={{
          bgcolor: "primary.lists",
          p: 1,
        }}
        style={{
          width: `${16 * scaleTotal}rem`,
          height: `${18 * scaleTotal}rem`,
          borderRadius: `${0.4 * scaleTotal}rem`,
        }}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={imageUrl}
          width={300}
          height={400}
          style={{ height: "8.35rem", width: "8.35rem", objectFit: "contain" }}
        />

        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          className="mt-1 mb-1"
          alignItems="center"
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
          <div
            style={{
              display: "-webkit-Box",
              WebkitLineClamp: 4 /* Specify the number of lines you want to display */,
              "-webkit-box-orient": "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          ></div>
        </Stack>
        <Typography
          variant="subtitle2"
          component="p"
          sx={{ color: "primary.main" }}
        >
          {description}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} className="mt-5">
          <LocationOnIcon fontSize="medium" sx={{ color: "primary.dark" }} />
          <Typography
            variant="subtitle1"
            component="span"
            sx={{ color: "primary.main" }}
          >
            {<TruncatedCountry country={country} city={city} limit={28} />}
          </Typography>
        </Stack>
        <TruncatedSeller text={seller} limit={28} />
        <Typography
          variant="subtitle1"
          component="span"
          style={{ marginTop: "auto", textAlign: "right" }}
          sx={{ color: "primary.main" }}
        >
          Posted on &nbsp;
          {getCardDateTime(postedOn)}
        </Typography>
      </Stack>
    </Link>
  );
};

export default ProductCard;
