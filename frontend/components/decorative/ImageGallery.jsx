import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Stack,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import React from "react";
import Image from "next/image";

const ImageGallery = (isVertical) => {
  return (
    <Box className="w-full h-full">
      <Stack
        className="h-full p-2"
        direction={isVertical ? `column` : `row`}
        justifyContent="space-between"
        alignItems="center"
        rowGap={1}
      >
        {itemData.map((item) => (
          <div
            key={item.img}
            style={{
              backgroundImage: `url(${item.img})`,
              maxHeight: isVertical ? "33.333333%" : "100%",
              maxWidth: isVertical ? "100%" : "33.333333%",
            }}
            className="w-full h-full bg-center bg-no-repeat bg-cover"
          ></div>
        ))}
      </Stack>
    </Box>
  );
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    title: "Sink",
  },
];

export default ImageGallery;
