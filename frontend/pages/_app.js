import React from "react";
import { StateContext } from "../utils/Store";
import "../styles/globals.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function MyApp({ Component, pageProps }) {
  console.warn = function () {};
  console.error = function () {};

  return (
    <>
      <StateContext>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </StateContext>
    </>
  );
}
export default MyApp;
