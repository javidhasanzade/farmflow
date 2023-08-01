import styled from "@emotion/styled";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Menus";

const WhiteText = styled(Typography)(({ theme }) => ({
  color: "#fff",
}));

const pages = ["Market", "Contact", "Profile", "Orders"];
const pagesBtnPrimaryText = ["Go to", "Contact", "View your", "List of"];
const pagesBtnSecondaryText = ["Market", "US", "Profile", "Orders"];

const Footer = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    if (currentPage + 1 >= pages.length) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <footer className="bg-emerald-200 text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
        <h1
          className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
     md:w-2/5"
        >
          <span className="text-teal-400">Free</span> AI-assisted marketplace,
          for the common man!
        </h1>
        <div>
          <img
            src="./tomato.svg"
            className="duration-300 px-5 py-2.5 h-full bg-white
       rounded-md md:w-auto w-full pointer-events-none"
          />
        </div>
      </div>
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
  text-center pt-2 text-white-400 text-sm pb-8 bg-emerald-300"
      >
        <span>© 2023 FarmFlow corp. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <SocialIcons Icons={Icons} />
      </div>
    </footer>
  );
};

export default Footer;
