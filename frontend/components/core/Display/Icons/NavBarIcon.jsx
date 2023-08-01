import { Stack } from "@mui/material";
import Link from "next/link";
import React from "react";

const NavBarIcon = ({
  icon,
  text = "tooltip 💡",
  bgcolor,
  linkTo,
  desktop,
}) => {
  return (
    <Link href={linkTo}>
      <Stack
        className={`
      ${
        desktop
          ? "h-12 w-12 hover:bg-green-600 hover:text-white hover:rounded-md transition-all duration-200 ease-linear"
          : "w-48 h-fit bg-green-500 p-3 text-white"
      }
      relative mt-2 mb-2 mx-auto text-green-500 rounded-xl 
      cursor-pointer group     
  `}
        alignItems="center"
        justifyContent="center"
      >
        {!desktop && (
          <span className="w-auto min-w-max rounded-md text-white font-bold">
            {text}
          </span>
        )}
        {icon}
      </Stack>
    </Link>
  );
};

export default NavBarIcon;
