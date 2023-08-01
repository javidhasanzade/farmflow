import { CircularProgress, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const LoadedComponent = ({ component: Component, data }) => {
  const [showFallback, setShowFallback] = useState(false);
  const [allFieldsNonNull, setAllFieldsNonNull] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const isAllFieldsNonNull = Object.values(data).every((field) => {
        if (Array.isArray(field)) {
          return field.length !== 0;
        }
        return field !== null && field !== undefined;
      });

      setAllFieldsNonNull(isAllFieldsNonNull);

      if (isAllFieldsNonNull) {
        clearInterval(intervalId);
      }
    }, 9000);

    return () => clearInterval(intervalId);
  }, [data]);

  if (!allFieldsNonNull && !showFallback) {
    return <CircularProgress />;
  }

  if (showFallback) {
    return (
      <div
        className="w-72 h-36 mx-auto border flex items-center justify-center 
      p-4 text-center mb-4 rounded-md bg-green-200 text-white"
      >
        <Typography variant="h5">
          Whoops, something went wrong, please make sure you are logged in or
          try again later...
        </Typography>
      </div>
    );
  }

  return <Component {...data} />;
};

export default LoadedComponent;
