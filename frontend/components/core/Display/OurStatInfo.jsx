import { Divider, Grid, Stack } from "@mui/material";
import React from "react";
import StatIcon from "./Icons/StatIcon";
import PercentIcon from "@mui/icons-material/Percent";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ComputerIcon from "@mui/icons-material/Computer";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const divider = (
  <Divider orientation="vertical" flexItem className="my-2.5">
    <DragIndicatorIcon fontSize="small" />
  </Divider>
);

const OurStatInfo = (smallerThanLg) => {
  return (
    <Grid
      container
      className={`h-${smallerThanLg ? "full" : "24"} p-1`}
      divider={divider}
      direction={"row"}
      alignItems="center"
      justifyContent={smallerThanLg ? "center" : ""}
      rowGap={1}
    >
      <Grid item xs={12} sm={6} md={3}>
        <StatIcon
          icon={<PercentIcon />}
          text="Discounts and actions"
          bg="#9c88ff"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatIcon
          icon={<CurrencyExchangeIcon />}
          text="Easy setup for selling"
          bg="#4cd137"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatIcon
          icon={<ComputerIcon />}
          text="AI powered, price analysis"
          bg="#273c75"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatIcon
          icon={<CreditCardIcon />}
          text="Protected purchasing"
          bg="#fbc531"
        />
      </Grid>
    </Grid>
  );
};

export default OurStatInfo;
