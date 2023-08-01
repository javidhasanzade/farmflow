import { useRouter } from "next/router";
import React, { useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import { IoSearchCircleOutline } from "react-icons/io5";

const ProductSearcher = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/marketplace?query=${searchQuery}`);
  };

  return (
    <Paper
      component="form"
      className="mt-3 flex"
      onSubmit={submitHandler}
      elevation={0}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        inputProps={{ "aria-label": "Search Products" }}
        placeholder="Search Products"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px", borderRadius: 0 }}
        aria-label="search"
        className="ml-auto"
      >
        <IoSearchCircleOutline />
      </IconButton>
    </Paper>
  );
};

export default ProductSearcher;
