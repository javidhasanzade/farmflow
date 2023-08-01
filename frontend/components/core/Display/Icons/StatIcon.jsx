import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const StatIcon = ({ icon, text, bg }) => {
  return (
    <Stack
      className="relative px-5 py-1"
      alignItems="center"
      direction="row"
      flexWrap="nowrap"
      columnGap={2}
    >
      <Box
        className={`rounded-full p-3 flex items-center justify-center text-white`}
        style={{ background: bg }}
      >
        {icon}
      </Box>
      <Typography variant="subtitle1" sx={{ color: "primary.main" }}>
        {text}
      </Typography>
    </Stack>
  );
};

export default StatIcon;
