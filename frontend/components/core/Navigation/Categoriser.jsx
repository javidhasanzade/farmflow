import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useFilter from "../../../utils/useFilter";
import CategoryIcon from "@mui/icons-material/Category";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import { loadPhotoFromFirebase } from "../../../utils/firebaseUtils";
import FirebaseIcon from "../Display/Icons/FirebaseIcon";

const Categoriser = () => {
  const { goToCategory } = useFilter();
  const [categories, setCategories] = useState(null);

  const loadCategories = async () => {
    const module = await import("axios");
    const categoriesResponse = await module.default.get(
      `http://localhost:8000/api/v1/Catalog/categories`
    );
    const categories = [...new Set(categoriesResponse.data)];
    setCategories(categories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  //Getting the router query
  const categoryHandler = (link) => {
    goToCategory({ linkName: link });
  };

  return (
    <Paper className="w-full h-full" sx={{ borderRadius: 0 }} elevation={2}>
      <MenuList>
        {categories?.map((category) => (
          <MenuItem
            onClick={() => {
              console.log(category.name);
              categoryHandler(category.name);
            }}
          >
            <ListItemIcon>
              {/* <FirebaseIcon url={category.iconUrl} /> */}
              <CategoryIcon sx={{ color: "primary.dark" }} />
            </ListItemIcon>
            <ListItemText>{category.name}</ListItemText>
            <ArrowForwardIosIcon fontSize="small" />
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
};

export default Categoriser;
