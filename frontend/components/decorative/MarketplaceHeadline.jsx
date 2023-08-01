"use client";
import React from "react";
import { useStateContext } from "../../utils/Store";
import { Box } from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper";
import Image from "next/image";
import styled from "@emotion/styled";

const MarketplaceHeadline = () => {
  const defaultWidth = 555;
  const defaultHeight = 416;
  return (
    <Box className="h-full w-full mt-3">
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide className="h-full">
          <Image
            width={defaultWidth}
            height={defaultHeight}
            src="https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
          />
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <Image
            width={defaultWidth}
            height={defaultHeight}
            src="https://images.unsplash.com/photo-1620200423727-8127f75d7f53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          />
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <Image
            width={defaultWidth}
            height={defaultHeight}
            src="https://images.unsplash.com/photo-1594771804886-a933bb2d609b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1182&q=80"
          />
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <Image
            width={defaultWidth}
            height={defaultHeight}
            src="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default MarketplaceHeadline;
