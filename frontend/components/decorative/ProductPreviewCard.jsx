"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CircularProgress, Divider, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HdrWeakIcon from "@mui/icons-material/HdrWeak";
import { useStateContext } from "../../utils/Store";
import useToken from "../../utils/useToken";

function TruncatedSeller({ text, limit }) {
  if (!text) {
    return <CircularProgress />;
  }

  const truncatedText =
    text.length > limit ? `${text.substring(0, limit)}...` : text;

  return (
    <Typography variant="body1" component="h5" sx={{ color: "primary.main" }}>
      Seller: {truncatedText}
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
      <Typography variant="h4" component="h5" sx={{ color: "primary.main" }}>
        {truncatedText}
      </Typography>
    );
  } else {
    return (
      <Typography variant="h4" component="h5" sx={{ color: "primary.main" }}>
        {truncatedText}
      </Typography>
    );
  }
}

const ProductPreviewCard = ({
  image,
  name,
  price,
  description,
  user,
  country,
  city,
  postedOn,
}) => {
  const { isDarkTheme } = useStateContext();

  /* --- CUSTOMIZATION --- */
  // --- Sizing
  const scaleTotal = 1.25; // for scaling-up the card

  // --- Colors
  const cardBorderColor = isDarkTheme
    ? "rgba(255,255,255,0.3)"
    : "rgba(0,0,0,0.3)"; // for changing bottom ("content") color
  /* --- CUSTOMIZATION END --- */

  return (
    <Stack
      sx={{
        bgcolor: "primary.lists",
        p: 1,
      }}
      style={{
        width: `100%`,
        height: `${12 * scaleTotal}rem`,
        borderRadius: `${0.4 * scaleTotal}rem`,
        border: `1px solid ${cardBorderColor}`,
      }}
      direction="row"
      alignItems="start"
      justifyContent="start"
      divider={
        <Divider orientation="vertical" flexItem>
          <HdrWeakIcon fontSize="small" sx={{ color: "primary.dark" }} />
        </Divider>
      }
    >
      <div style={{ flex: "30%", height: "100%" }}>
        <Image
          src={image}
          width={300}
          height={400}
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
        />
      </div>
      <div style={{ flex: "50%", height: "100%" }}>
        <Stack
          direction="column"
          spacing={1}
          justifyContent="space-between"
          className="px-7 py-2"
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
            variant="h4"
            component="h4"
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
          >
            <Typography
              variant="subtitle2"
              component="p"
              sx={{ color: "primary.main" }}
            >
              {description}
            </Typography>
          </div>
        </Stack>
      </div>
      <div style={{ flex: "18%", height: "100%" }}>
        <Stack
          direction="column"
          sx={{ height: "100%", width: "100%" }}
          spacing={1}
          className="px-5 py-2"
        >
          <Stack direction="column" alignItems="start" spacing={1}>
            <LocationOnIcon fontSize="medium" sx={{ color: "primary.dark" }} />
            <TruncatedCountry country={country} city={city} limit={15} />
          </Stack>

          <TruncatedSeller text={user?.email} limit={15} />

          <Typography
            variant="subtitle1"
            component="span"
            style={{ marginTop: "auto", textAlign: "right" }}
            sx={{ color: "primary.main" }}
          >
            Posted on &nbsp;
            {postedOn}
          </Typography>
        </Stack>
      </div>
    </Stack>
  );
};

export default ProductPreviewCard;
