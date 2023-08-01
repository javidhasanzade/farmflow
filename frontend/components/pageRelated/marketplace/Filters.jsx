import React from "react";
import { useRouter } from "next/router";
import { Paper, Typography, Button, Grid, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterItem from "../../core/Inputs/FilterItem";
import useFilter from "../../../utils/useFilter";
import PriceSlider from "../../core/Inputs/PriceSlider";

const sorts = [
  {
    label: "Price: Low to High",
    value: "Price: Low to High",
  },
  {
    label: "Price: High to Low",
    value: "Price: High to Low",
  },
  {
    label: "Newest Arrivals",
    value: "Newest Arrivals",
  },
];

const Filters = ({
  products,
  countProducts,
  categories,
  sellers,
  cities,
  countries,
  lowestPrice,
  highestPrice,
}) => {
  const router = useRouter();
  const { filterSearch } = useFilter();

  //Getting the router query
  const {
    query = "",
    category = "",
    seller = "",
    rating = "",
    sort = "",
    city = "",
    country = "",
    min = lowestPrice,
    max = highestPrice,
  } = router.query;

  const categoryHandler = (newVal) => {
    filterSearch({ category: newVal });
  };
  const cityHandler = (newVal) => {
    filterSearch({ city: newVal });
  };
  const countryHandler = (newVal) => {
    filterSearch({ country: newVal });
  };
  const sellerHandler = (newVal) => {
    filterSearch({ seller: newVal });
  };
  const sortHandler = (newVal) => {
    filterSearch({ sort: newVal?.value });
  };
  const priceHandler = (newVal) => {
    filterSearch({ min: newVal[0], max: newVal[1] });
  };

  return (
    <Box sx={{ bgcolor: "primary.boxes" }} className="p-3 rounded-lg">
      <Paper elevation={1} className="p-3">
        <Grid container spacing={2}>
          <FilterItem
            array={sellers}
            value={seller}
            onChange={sellerHandler}
            text={"Sellers"}
          />
          <FilterItem
            array={sorts}
            value={sort}
            onChange={sortHandler}
            text={"Sort By"}
          />
          <FilterItem
            array={cities}
            value={city}
            onChange={cityHandler}
            text={"City"}
          />
          <FilterItem
            array={countries}
            value={country}
            onChange={countryHandler}
            text={"Country"}
          />
          <PriceSlider
            min={lowestPrice}
            max={highestPrice}
            onChange={priceHandler}
            label={"Price"}
          />

          <Grid item xs={12}>
            <div className="applied-list mt-2">
              <Typography variant="subtitle2" component="span">
                {products.length === 0 ? "No" : countProducts}
              </Typography>
              <Typography variant="subtitle2" component="span">
                Results
              </Typography>
              <Typography variant="subtitle2" component="span">
                {query !== "" && " : " + query}
              </Typography>
              <Typography variant="subtitle2" component="span">
                {category !== "" && " : " + category}
              </Typography>
              <Typography variant="subtitle2" component="span">
                {seller !== "" && " : " + seller}
              </Typography>
              <Typography variant="subtitle2" component="span">
                {city !== "" && " : " + city}
              </Typography>
              <Typography variant="subtitle2" component="span">
                {country !== "" && " : " + country}
              </Typography>
              <Typography variant="subtitle2" component="span">
                {min !== lowestPrice && " : Min " + min}
              </Typography>
              <Typography variant="subtitle2" component="span">
                {max !== highestPrice && " : Max" + max}
              </Typography>

              {query !== "" ||
              category !== "" ||
              seller !== "" ||
              city !== "" ||
              country !== "" ||
              min !== lowestPrice ||
              max !== highestPrice ||
              sort !== "" ? (
                <Button
                  className=""
                  onClick={() => {
                    router.push("/marketplace");
                  }}
                >
                  <CloseIcon />
                </Button>
              ) : null}
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Filters;
