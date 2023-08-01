import React from "react";
import countryList from "react-select-country-list";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const options = countryList().getData();

const CountryPicker = ({
  value,
  onChange,
  id,
  name,
  required,
  fullWidth,
  error,
  helperText,
}) => {
  return (
    <FormControl
      fullWidth={fullWidth ? true : false}
      required={required ? true : false}
      error={error ? true : false}
    >
      <InputLabel>Country</InputLabel>
      <Select
        id={id}
        name={name}
        label="Country"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default CountryPicker;
