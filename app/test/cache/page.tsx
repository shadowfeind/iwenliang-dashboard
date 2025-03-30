import { getAllProductsQuery } from "@/features/products/product.query";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const date = new Date().toISOString();
  const products = await getAllProductsQuery();
  const show = JSON.stringify(products);
  return (
    <div>
      <h1>{date}</h1>
      <div>{show}</div>
    </div>
  );
};

export default page;
