import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
export const commonRules = {
  typography: {
    fontSize: 12,
    fontFamily: montserrat,
    poster__sm: {
      fontSize: 32,
      color: "#fff",
    },
    poster__xl: {
      fontSize: 80,
      color: "#fff",
    },
  },
};
