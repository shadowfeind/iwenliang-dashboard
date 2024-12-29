"use client";
import { ProductType } from "@/features/products/product.types";
import React, { useCallback, useEffect, useState } from "react";
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
import { BeadType } from "@/features/beadSize/beadSize.type";
import { getAllFiltersForProductApiQuery } from "@/features/products/product.query";
import { Button } from "@/components/ui/button";

export type Filters = {
  categories: CategoryType[];
  colors: ColorType[];
  materials: MaterialType[];
  beadSizes: BeadType[];
};

type Props = {
  products: ProductType[];
  // filters: Filters;
};

const BraceletClientPage = ({ products }: Props) => {
  const [bracelets, setBracelets] = useState<ProductType[]>(
    products?.slice(0, 8)
  );
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  // this will have data that are filtered
  const [filtersData, setFiltersData] = useState<Filters>({
    categories: [],
    colors: [],
    materials: [],
    beadSizes: [],
  });
  const [open, setOpen] = useState(false);

  // this will have data that are fetched
  const [dataForFilter, setDataForFilter] = useState<Filters>({
    categories: [],
    colors: [],
    materials: [],
    beadSizes: [],
  });

  const fetchFilters = useCallback(async () => {
    setLoading(true);
    const data = await getAllFiltersForProductApiQuery();
    setDataForFilter(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchFilters();
    }, 300);
    return () => clearTimeout(timeout);
  }, [fetchFilters]);

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
    const hasBeadSizeFilters = filtersData.beadSizes.length > 0;

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

      const matchesBeadSize =
        !hasBeadSizeFilters ||
        product.beadSize?.some((beadSize) =>
          filtersData.beadSizes.some(
            (selected) => selected._id === beadSize._id
          )
        );
      return (
        matchesCategory && matchesColor && matchesMaterial && matchesBeadSize
      );
    });

    setBracelets(filteredBracelets);
    setOpen(false);
  };

  const handleResetFilters = () => {
    setFiltersData({
      categories: [],
      colors: [],
      materials: [],
      beadSizes: [],
    });
    setBracelets(products?.slice(0, 8));
    setOpen(false);
    setShowAll(false);
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
          filters={dataForFilter}
          handleFilters={handleFilters}
          setFilters={setFiltersData}
          filtersData={filtersData}
          handleResetFilters={handleResetFilters}
          open={open}
          setOpen={setOpen}
          loading={loading}
        />
      </div>
      <ProductsGrid products={bracelets} />
      {!showAll && (
        <div className=" flex justify-center pt-10 md:pt-20">
          <Button
            variant="default"
            size={"custom"}
            onClick={() => {
              setBracelets(products);
              setShowAll(true);
            }}
          >
            View All Bracelets
          </Button>
        </div>
      )}
    </div>
  );
};

export default BraceletClientPage;
