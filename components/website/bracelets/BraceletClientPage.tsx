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
import { BeadType } from "@/features/beadSize/beadSize.type";

import { Button } from "@/components/ui/button";
import { ArrowRight, SlidersHorizontal } from "lucide-react";

export type Filters = {
  categories: CategoryType[];
  colors: ColorType[];
  materials: MaterialType[];
  beadSizes: BeadType[];
};

type Props = {
  products: ProductType[];
  filters: Filters;
};

const INITIAL_VISIBLE_PRODUCTS = 8;
const DEFAULT_SORT = "featured";

const BraceletClientPage = ({ products, filters }: Props) => {
  const [bracelets, setBracelets] = useState<ProductType[]>(products);
  const [showAll, setShowAll] = useState(false);
  const [selectedSort, setSelectedSort] = useState(DEFAULT_SORT);
  const [filtersData, setFiltersData] = useState<Filters>({
    categories: [],
    colors: [],
    materials: [],
    beadSizes: [],
  });
  const [open, setOpen] = useState(false);

  const sortProducts = (items: ProductType[], value: string) => {
    const sortedBracelets = [...items];

    switch (value) {
      case "price_low_to_high":
        return sortedBracelets.sort(
          (a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)
        );
      case "price_high_to_low":
        return sortedBracelets.sort(
          (a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)
        );
      case "latest":
        return sortedBracelets.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return sortedBracelets.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return sortedBracelets;
    }
  };

  const getFilteredProducts = (nextFilters: Filters, sortValue: string) => {
    const hasCategoryFilters = nextFilters.categories.length > 0;
    const hasColorFilters = nextFilters.colors.length > 0;
    const hasMaterialFilters = nextFilters.materials.length > 0;
    const hasBeadSizeFilters = nextFilters.beadSizes.length > 0;

    const filteredBracelets = products.filter((product) => {
      const matchesCategory =
        !hasCategoryFilters ||
        product.category?.some((category) =>
          nextFilters.categories.some((selected) => selected._id === category._id)
        );

      const matchesColor =
        !hasColorFilters ||
        product.color?.some((color) =>
          nextFilters.colors.some((selected) => selected._id === color._id)
        );

      const matchesMaterial =
        !hasMaterialFilters ||
        product.material?.some((material) =>
          nextFilters.materials.some((selected) => selected._id === material._id)
        );

      const matchesBeadSize =
        !hasBeadSizeFilters ||
        product.beadSize?.some((beadSize) =>
          nextFilters.beadSizes.some((selected) => selected._id === beadSize._id)
        );

      return (
        matchesCategory && matchesColor && matchesMaterial && matchesBeadSize
      );
    });

    return sortProducts(filteredBracelets, sortValue);
  };

  const activeFilterCount =
    filtersData.categories.length +
    filtersData.colors.length +
    filtersData.materials.length +
    filtersData.beadSizes.length;

  const handleSort = (value: string) => {
    setSelectedSort(value);
    setBracelets(getFilteredProducts(filtersData, value));
  };

  const handleFilters = () => {
    setBracelets(getFilteredProducts(filtersData, selectedSort));
    setOpen(false);
    setShowAll(true);
  };

  const handleResetFilters = () => {
    setFiltersData({
      categories: [],
      colors: [],
      materials: [],
      beadSizes: [],
    });
    setSelectedSort(DEFAULT_SORT);
    setBracelets(products);
    setOpen(false);
    setShowAll(false);
  };

  const visibleBracelets = showAll
    ? bracelets
    : bracelets.slice(0, INITIAL_VISIBLE_PRODUCTS);

  const hasResults = bracelets.length > 0;

  return (
    <div className="space-y-8 md:space-y-12">
      <section className="overflow-hidden rounded-[32px] border border-black/8 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),_transparent_32%),linear-gradient(135deg,_#fffaf1_0%,_#f5efe5_45%,_#ffffff_100%)] p-6 shadow-[0_24px_80px_-56px_rgba(15,23,42,0.45)] sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-end">
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full border border-[#d4af37]/40 bg-white/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#7a5c12] backdrop-blur-sm">
              Bracelet catalogue
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl font-serif text-4xl leading-none text-neutral-950 sm:text-5xl lg:text-6xl">
                Signature stone bracelets with a quieter, sharper silhouette.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
                Explore handcrafted pieces built around natural stone, sterling
                silver details, and a fit tailored to the wrist measurement you
                provide.
              </p>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] bg-neutral-950 px-5 py-4 text-white">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                  Pieces available
                </p>
                <p className="mt-2 font-serif text-4xl">
                  {products.length.toString().padStart(2, "0")}
                </p>
              </div>
              <div className="rounded-[22px] border border-black/8 bg-[#f6f0e2] px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                  Filters active
                </p>
                <p className="mt-2 text-3xl font-semibold text-neutral-950">
                  {activeFilterCount}
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-neutral-600">
              <SlidersHorizontal className="h-4 w-4" />
              Sort, narrow, and compare before opening a piece.
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-[28px] border border-black/8 bg-white/80 p-4 shadow-[0_18px_60px_-50px_rgba(15,23,42,0.45)] backdrop-blur-sm md:flex-row md:items-center md:justify-between md:p-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Refine the collection
          </p>
          <h2 className="mt-2 font-serif text-2xl text-neutral-950 sm:text-3xl">
            {bracelets.length} bracelet{bracelets.length === 1 ? "" : "s"}
            {activeFilterCount > 0 ? " matched" : " curated"}
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select value={selectedSort} onValueChange={handleSort}>
            <SelectTrigger className="h-12 min-w-[220px] rounded-full border-black/10 bg-[#fbf8f2] px-5 text-sm">
              <SelectValue placeholder="Sort Options" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={DEFAULT_SORT}>Featured</SelectItem>
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
            loading={false}
          />
        </div>
      </section>

      {hasResults ? (
        <ProductsGrid products={visibleBracelets} styles="items-start" />
      ) : (
        <div className="rounded-[28px] border border-dashed border-black/10 bg-[#fcfaf6] px-6 py-16 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
            No pieces found
          </p>
          <h3 className="mt-3 font-serif text-3xl text-neutral-950">
            This filter mix is too narrow.
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-neutral-600">
            Reset the filters or widen your material, color, or size selection
            to bring bracelets back into view.
          </p>
          <Button
            variant="outline"
            size="custom"
            className="mt-8 border-black/10 bg-white"
            onClick={handleResetFilters}
          >
            Reset filters
          </Button>
        </div>
      )}

      {!showAll && bracelets.length > INITIAL_VISIBLE_PRODUCTS && (
        <div className="flex justify-center pt-2 md:pt-4">
          <Button
            variant="default"
            size="custom"
            className="gap-3"
            onClick={() => setShowAll(true)}
          >
            View all bracelets
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {(activeFilterCount > 0 || selectedSort !== DEFAULT_SORT) && hasResults ? (
        <div className="flex justify-center">
          <Button variant="ghost" onClick={handleResetFilters}>
            Reset filters and sort
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default BraceletClientPage;
