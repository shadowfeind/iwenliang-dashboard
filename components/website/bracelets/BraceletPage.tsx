import { getAllProductsQuery } from "@/features/products/product.query";
import React from "react";
import BraceletClientPage from "./BraceletClientPage";

type Props = {};

const BraceletPage = async (props: Props) => {
  const data = await getAllProductsQuery();
  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }
  return <BraceletClientPage products={data} />;
};
export default BraceletPage;
