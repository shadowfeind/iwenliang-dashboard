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
import BraceletFilters from "./BraceletFilters";
import { CategoryType } from "@/features/categories/category.types";
import { ColorType } from "@/features/colors/color.types";
import { MaterialType } from "@/features/materials/material.types";

export type Filters = {
  categories: CategoryType[];
  colors: ColorType[];
  materials: MaterialType[];
};

type Props = {
  products: ProductType[];
  filters: Filters;
};

const BraceletClientPage = ({ products, filters }: Props) => {
  const [bracelets, setBracelets] = useState<ProductType[]>(products);
  const [filtersData, setFiltersData] = useState<Filters>({
    categories: [],
    colors: [],
    materials: [],
  });
  const [open, setOpen] = useState(false);

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

  const handleFilters = () => {
    const hasCategoryFilters = filtersData.categories.length > 0;
    const hasColorFilters = filtersData.colors.length > 0;
    const hasMaterialFilters = filtersData.materials.length > 0;

    const filteredBracelets = products.filter((product) => {
      const matchesCategory =
        !hasCategoryFilters ||
        product.category?.some((category) =>
          filtersData.categories.some(
            (selected) => selected._id === category._id
          )
        );

      const matchesColor =
        !hasColorFilters ||
        product.color?.some((color) =>
          filtersData.colors.some((selected) => selected._id === color._id)
        );

      const matchesMaterial =
        !hasMaterialFilters ||
        product.material?.some((material) =>
          filtersData.materials.some(
            (selected) => selected._id === material._id
          )
        );

      // Include product only if it matches all selected filters
      return matchesCategory && matchesColor && matchesMaterial;
    });

    setBracelets(filteredBracelets);
    setOpen(false);
  };

  const handleResetFilters = () => {
    setFiltersData({
      categories: [],
      colors: [],
      materials: [],
    });
    setBracelets(products);
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
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
        <BraceletFilters
          filters={filters}
          handleFilters={handleFilters}
          setFilters={setFiltersData}
          filtersData={filtersData}
          handleResetFilters={handleResetFilters}
          open={open}
          setOpen={setOpen}
        />
      </div>
      <ProductsGrid products={bracelets} />
    </div>
  );
};

export default BraceletClientPage;
