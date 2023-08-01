import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";
import { DatePicker } from "@mui/x-date-pickers";

const DateField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;

  return (
    <DatePicker
      {...field}
      {...props}
      label={label}
      renderInput={(params) => (
        <TextField
          {...params}
          error={showError}
          helperText={showError && meta.error}
        />
      )}
    />
  );
};

export default DateField;
