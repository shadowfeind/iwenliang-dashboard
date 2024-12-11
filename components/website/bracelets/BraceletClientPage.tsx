"use client";
import { ProductType } from "@/features/products/product.types";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductsGrid from "../products/ProductsGrid";

type Props = {
  products: ProductType[];
};

const BraceletClientPage = ({ products }: Props) => {
  const [bracelets, setBracelets] = useState<ProductType[]>(products);

  const handleSort = (value: string) => {
    let sortedBracelets = [...products];

    switch (value) {
      case "price_low_to_high":
        sortedBracelets.sort((a, b) => a.price - b.price);
        break;
      case "price_high_to_low":
        sortedBracelets.sort((a, b) => b.price - a.price);
        break;
      case "latest":
        sortedBracelets.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        sortedBracelets.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      default:
        sortedBracelets = products;
    }

    setBracelets(sortedBracelets);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <span>Sort by:</span>
        <Select onValueChange={handleSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort Options" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price_low_to_high">
              Price: Low to High
            </SelectItem>
            <SelectItem value="price_high_to_low">
              Price: High to Low
            </SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ProductsGrid products={bracelets} />
    </div>
  );
};

export default BraceletClientPage;
