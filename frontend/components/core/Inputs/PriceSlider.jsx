import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { PrettySlider } from "./PrettySlider";
import TouchAppIcon from "@mui/icons-material/TouchApp";

function valuetext(value) {
  return `${value}$`;
}

const PriceSlider = ({ min, max, label, onChange }) => {
  const priceGap = 4;
  const [priceRangeValue, setPriceRangeValue] = useState([min, max]);

  function handleRanges(e) {
    if (e.target.value[1] - e.target.value[0] >= priceGap) {
      setPriceRangeValue(e.target.value);
    }
  }

  const submitPrice = () => {
    onChange(priceRangeValue);
  };

  return (
    <Grid item xs={12} md={12}>
      <Box
        sx={{ bgcolor: "primary.boxes" }}
        className="w-full px-6 py-2 h-full flex flex-col items-start"
      >
        <PrettySlider
          label={label}
          value={priceRangeValue}
          onChange={handleRanges}
          max={max}
          min={min}
        />
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          className="w-full"
          columnGap={1}
        >
          <TextField
            size="small"
            label="Min"
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={priceRangeValue[0]}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setPriceRangeValue([val, priceRangeValue[1]]);
            }}
            onBlur={(e) => {
              const val = parseInt(e.target.value);
              if (val > priceRangeValue[1] - priceGap) {
                setPriceRangeValue([
                  priceRangeValue[1] - priceGap,
                  priceRangeValue[1],
                ]);
              }
              if (val < 0) {
                setPriceRangeValue([0, priceRangeValue[1]]);
              }
            }}
            inputProps={{ min: min, max: priceRangeValue[1] - priceGap }}
          />
          <Typography>-</Typography>
          <TextField
            size="small"
            label="max"
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={priceRangeValue[1]}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setPriceRangeValue([priceRangeValue[0], val]);
            }}
            onBlur={(e) => {
              const val = parseInt(e.target.value);
              if (val > max) {
                setPriceRangeValue([priceRangeValue[0], max]);
              }
              if (val < priceRangeValue[0] + priceGap) {
                setPriceRangeValue([
                  priceRangeValue[0],
                  priceRangeValue[0] + priceGap,
                ]);
              }
            }}
            inputProps={{ min: priceRangeValue[0] + priceGap, max: max }}
          />
          <Button
            variant="outlined"
            endIcon={<TouchAppIcon />}
            sx={{ marginLeft: "auto" }}
            onClick={submitPrice}
          >
            <Typography variant="subtitle2" component="span">
              Apply
            </Typography>
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
};

export default PriceSlider;
