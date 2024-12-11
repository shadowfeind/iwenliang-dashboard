"use client";

import { ProductType } from "@/features/products/product.types";
import React, { useState } from "react";
import ProductsGrid from "../products/ProductsGrid";

type Props = {
  products: ProductType[];
};

const BraceletClientPage = ({ products }: Props) => {
  const [bracelets, setBracelets] = useState<ProductType[]>(products);
  return <ProductsGrid products={bracelets} />;
};

export default BraceletClientPage;
