import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Copyright = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      style={{ marginTop: "2rem" }}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        FarmFlowCorp
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
};

export default Copyright;
