import { Stack } from "@mui/material";
import React from "react";
import MaterialUISwitch from "../../core/Inputs/MaterialUISwitch";
import { useStateContext } from "../../../utils/Store";
import UserProfileButton from "../../core/Inputs/UserProfileButton";

const TopPanel = () => {
  const { isDarkTheme, setIsDarkTheme } = useStateContext();
  const changeHanler = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={1}
      sx={{ height: "2rem", color: "#fff" }}
      className="mb-4"
    >
      <MaterialUISwitch onChange={changeHanler} />
    </Stack>
  );
};

export default TopPanel;
