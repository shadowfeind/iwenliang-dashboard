import { getAllProductsQuery, getFiltersForProduct } from "@/features/products/product.query";
import React from "react";
import BraceletClientPage from "./BraceletClientPage";

const BraceletPage = async () => {
  const [products, filters] = await Promise.all([
    getAllProductsQuery(),
    getFiltersForProduct()
  ]);

  if ("error" in products) {
    return <h1 className="text-red-600">{products.error}</h1>;
  }
  return <BraceletClientPage products={products} filters={filters} />;
};
export default BraceletPage;
