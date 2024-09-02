import { DataTable } from "@/components/pages/products/DataTable";
import { getAllProducts } from "@/query/product.query";
import React from "react";

type Props = {};

const ProductPage = async (props: Props) => {
  const data = await getAllProducts();
  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }
  return <DataTable data={data} />;
};

export default ProductPage;
