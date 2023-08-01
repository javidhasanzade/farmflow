import {
  Checkbox,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HdrWeakIcon from "@mui/icons-material/HdrWeak";
import { useStateContext } from "../../../utils/Store";
import { loadPhotoFromFirebase } from "../../../utils/firebaseUtils";
import Image from "next/image";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

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

const YourProductCard = ({ product, scale }) => {
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

  const { isDarkTheme } = useStateContext();
  const scaleTotal = scale; // for scaling-up the card
  const cardBorderColor = isDarkTheme
    ? "rgba(255,255,255,0.3)"
    : "rgba(0,0,0,0.3)"; // for changing bottom ("content") color

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
          src={imageUrl}
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
            <TruncatedName text={product.name} smaller={14} truncate={20} />
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
            ${product.price}
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
              {product.description}
            </Typography>
          </div>
        </Stack>
      </div>
      <Stack direction="column" alignItems="start" justifyContent="center">
        <IconButton>
          <DeleteForeverIcon fontSize="medium" className="text-red-600" />
        </IconButton>
        <IconButton>
          <EditIcon fontSize="medium" className="text-slate-800" />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default YourProductCard;
