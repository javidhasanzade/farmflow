import React from "react";

// If loading a variable font, you don't need to specify the font weight
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { Container, ThemeProvider } from "@mui/material";
import { useStateContext } from "../../utils/Store";
import NavBar from "./Navigation/Navbar/NavBar";
import Footer from "./Navigation/Footer/Footer";

const Layout = ({ children }) => {
  const { theme, isDarkTheme, smallerThanLg } = useStateContext();

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <main
        className={`relative p-${smallerThanLg ? 0 : 5} min-h-screen ${
          montserrat.className
        }`}
        style={{
          background: isDarkTheme ? "#262626" : "#fff",
        }}
      >
        <Container maxWidth="xl" sx={{ p: 0 }}>
          {/* <TopPanel /> */}
          {children}
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
