import { createTheme } from "@mui/material";
import { commonRules } from "./CommonRules";

export const darkTheme = createTheme({
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
          color: "#f9f9f9",
        },
      },
    },
  },
  palette: {
    primary: {
      light: "#f9f9f9",
      main: "#fcfcfc",
      dark: "#ffffff",
      contrastText: "#191919",
      contrastBox: "#fff",
      boxes: "#212121",
      lists: "rgba(239,239,239,0.1)",
      disabled: "gray",
      extra: "#f00",
      nav: "#202225",
      badges: "#202225",
      badgesBg: "#fff",
    },
    secondary: {
      light: "#f9f9f9",
      main: "#fcfcfc",
      dark: "#ffffff",
      contrastText: "#212121",
      boxes: "#212121",
    },
    mode: "dark",
    text: {
      primary: "#ffffff", // Set the default text color to white
      secondary: "#ffffff", // Set the default text color to white
    },
  },
  ...commonRules, // Include the common rule-set
});
