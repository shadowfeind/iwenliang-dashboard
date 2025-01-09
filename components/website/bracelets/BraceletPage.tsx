import { getAllProductsQuery } from "@/features/products/product.query";
import React from "react";
import BraceletClientPage from "./BraceletClientPage";

const BraceletPage = async () => {
  const products = await getAllProductsQuery();
  // const filters = getFiltersForProduct();

  // const [data, filtersData] = await Promise.all([products, filters]);

  if ("error" in products) {
    return <h1 className="text-red-600">{products.error}</h1>;
  }
  // return <BraceletClientPage products={products} filters={filtersData} />;
  return <BraceletClientPage products={products} />;
};
export default BraceletPage;
