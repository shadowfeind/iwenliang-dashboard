import React from "react";
import SpacedContainer from "../SpacedContainer";
import TitleHeader from "../TitleHeader";
import { ProductType } from "@/features/products/product.types";
import ProductCard from "../products/ProductCard";
import ProductCarousel from "../products/ProductCarousel";

type Props = {
  featured: ProductType[];
};

const FeaturedProduct = ({ featured }: Props) => {
  return (
    <SpacedContainer>
      <TitleHeader title="Featured Product" />
      <ProductCarousel products={featured} />
    </SpacedContainer>
  );
};

export default FeaturedProduct;
