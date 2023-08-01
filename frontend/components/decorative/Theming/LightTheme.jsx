import { createTheme } from "@mui/material";
import { commonRules } from "./CommonRules";

export const lightTheme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent", // Customize the background color
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
          color: "#303030",
        },
      },
    },
  },
  palette: {
    primary: {
      light: "#303030",
      main: "#191919",
      dark: "#262626",
      contrastText: "#fcfcfc",
      contrastBox: "#101010",
      boxes: "#fafafa",
      lists: "rgba(239,239,239,0.5)",
      disabled: "gray",
      extra: "#f00",
      nav: "#202225",
      badges: "#202225",
      badgesBg: "#fff",
    },
    secondary: {
      light: "#303030",
      main: "#191919",
      dark: "#262626",
      contrastText: "#fafafa",
      boxes: "#fafafa",
    },
    mode: "light",
    text: {
      primary: "#191919", // Set the default text color to white
      secondary: "#191919", // Set the default text color to white
    },
  },
  ...commonRules, // Include the common rule-set
});
