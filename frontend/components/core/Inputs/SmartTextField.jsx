import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const SmartTextField = ({
  id,
  name,
  label,
  autoComplete,
  variant,
  onChange,
  fullWidth,
  required,
  setFormErrors,
  triggerErrors,
}) => {
  const [value, setValue] = useState();
  const [inactive, setInactive] = useState(null);
  const [errors, setErrors] = useState(true);

  const incompleteError = `${label} is required`;

  const handleChangeInner = (e) => {
    setValue(e.target.value);
    if (onChange) {
      onChange();
    }
  };

  const validate = () => {
    if (value) {
      setErrors(false);
    } else {
      setErrors(true);
    }
  };

  useEffect(() => {
    setFormErrors(errors);
  }, [errors]);

  useEffect(() => {
    if (triggerErrors === true) {
      setInactive(true);
    }
  }, [triggerErrors]);

  useEffect(() => {
    validate();
  }, [, inactive]);

  const handleFocus = () => {
    setInactive(false);
  };

  const handleBlur = () => {
    setInactive(true);
  };

  return (
    <TextField
      fullWidth={fullWidth ? true : false}
      required={required ? true : false}
      id={id}
      name={name ? id : name}
      label={label}
      autoComplete={autoComplete ? autoComplete : ""}
      variant={variant ? variant : ""}
      value={value}
      onChange={handleChangeInner}
      error={inactive === true && Boolean(errors)}
      helperText={inactive === true && errors && incompleteError}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default SmartTextField;
