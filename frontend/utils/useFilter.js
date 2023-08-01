import { useRouter } from "next/router";

export default function useFilter() {
  //Routing
  const router = useRouter();
  const { query } = router;

  const filterSearch = ({
    page,
    searchQuery,
    category,
    seller,
    sort,
    price,
    city,
    country,
    min,
    max,
  }) => {
    if (page >= 0 && page !== undefined) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (seller) query.seller = seller;
    if (price) query.price = price;
    if (city) query.city = city;
    if (country) query.country = country;
    if (min) query.min = min;
    if (max) query.max = max;

    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  const goToCategory = ({ linkName }) => {
    router.push({
      pathname: `/Categories/${linkName}`,
    });
  };

  return {
    filterSearch,
    goToCategory,
  };
}
