import {
  Autocomplete,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const FilterItem = ({ array, value, onChange, MenuProps, text }) => {
  return (
    <Grid item xs={6} md={4}>
      <Autocomplete
        disablePortal
        options={array}
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        renderInput={(params) => <TextField {...params} label={text} />}
      />
    </Grid>
  );
};

export default FilterItem;
