import { useRouter } from "next/router";

export default function useProducts() {
  const getSort = (query) => {
    if (!query) {
      return "LH";
    }
    switch (query?.sort) {
      case "Price: Low to High":
        return "LH";
      case "Price: High to Low":
        return "HL";
      case "Newest Arrivals":
        return "N";
      default:
        return "LH";
    }
  };
  const getPage = (query) => {
    return query?.page || 0;
  };
  const getSeller = (query) => {
    return query?.seller ? `seller=${query.seller}&` : ``;
  };
  const getCategory = (query) => {
    return query?.category ? `category=${query.category}&` : ``;
  };
  const getSearchQuery = (query) => {
    return query?.query ? `name=${query.query}&` : ``;
  };
  const getCity = (query) => {
    return query?.city ? `city=${query.city}&` : ``;
  };
  const getCountry = (query) => {
    return query?.country ? `country=${query.country}&` : ``;
  };

  const getAllDataResponse = async (query) => {
    const page = getPage(query);
    const sort = getSort(query);
    const module = await import("axios");
    const allDataResponse = await module.default.get(
      `http://localhost:8000/api/v1/Catalog?orderBy=${sort}&page=${page}`
    );
    return allDataResponse;
  };

  const getPrice = (data, type) => {
    if (type === "lowest") {
      return data?.length > 0
        ? data.reduce((prev, current) => {
            return prev.price < current.price ? prev : current;
          }).price
        : 0;
    }
    if (type === "highest") {
      return data?.length > 0
        ? data.reduce((prev, current) => {
            return prev.price > current.price ? prev : current;
          }).price
        : 0;
    }
  };

  const getFilteredDataResponse = async (query) => {
    const module = await import("axios"); // Getting axios module
    const page = getPage(query);
    const sort = getSort(query);
    const seller = getSeller(query);
    const category = getCategory(query);
    let searchQuery = getSearchQuery(query);
    const city = getCity(query);
    const country = getCountry(query);

    console.log(
      `http://localhost:8000/api/v1/Catalog/products?${category}${seller}${searchQuery}${country}${city}orderBy=${sort}&page=${page}`
    );
    const url = `http://localhost:8000/api/v1/Catalog/products?${category}${seller}${searchQuery}${country}${city}orderBy=${sort}&page=${page}`;

    const filteredResponse = await module.default.get(url);
    return filteredResponse;
  };

  const Load = async (query, setInfo) => {
    console.log(query);
    // Loading the data from server
    const allDataResponse = await getAllDataResponse(query);
    const filteredResponse = await getFilteredDataResponse(query);
    const allData = allDataResponse.data.result;
    const filteredData = filteredResponse.data.result;
    // Getting individual items
    const products = [...filteredData];
    const countProducts = products.length;
    const page = getPage(query);
    const sellers = [...new Set(allData.map((item) => item.seller))];
    const pages = filteredResponse.data.pages;
    const cities = [...new Set(allData.map((item) => item.city))];
    const countries = [...new Set(allData.map((item) => item.country))];
    const lowestPrice = getPrice(allData, "lowest");
    const highestPrice = getPrice(allData, "highest");
    // Setting the data into info object
    setInfo({
      products,
      countProducts,
      page,
      sellers,
      pages,
      cities,
      countries,
      lowestPrice,
      highestPrice,
    });
  };

  const loadWishlist = async (userEmail, setInfo) => {
    const module = await import("axios");
    const wishlistResponse = await module.default.get(
      `http://localhost:8000/api/v1/Wishlist?userId=${userEmail}`
    );
    setInfo(wishlistResponse.data);
    return wishlistResponse.data;
  };

  const LoadFromCategory = async ({ query, setInfo }) => {
    console.log(query);
  };

  return { Load, loadWishlist };
}
