import {
  getAllProductsQuery,
  getFiltersForProduct,
} from "@/features/products/product.query";
import React from "react";
import BraceletClientPage from "./BraceletClientPage";

const BraceletPage = async () => {
  const products = getAllProductsQuery();
  const filters = getFiltersForProduct();

  const [data, filtersData] = await Promise.all([products, filters]);

  console.log({ filtersData });

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }
  return <BraceletClientPage products={data} filters={filtersData} />;
};
export default BraceletPage;
