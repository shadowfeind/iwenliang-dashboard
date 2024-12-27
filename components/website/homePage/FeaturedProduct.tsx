import React from "react";
import SpacedContainer from "../SpacedContainer";
import TitleHeader from "../TitleHeader";
import { ProductType } from "@/features/products/product.types";
import ProductCarousel from "../products/ProductCarousel";

type Props = {
  featured: ProductType[];
};

const FeaturedProduct = ({ featured }: Props) => {
  return (
    <SpacedContainer>
      <div className="hidden md:block">
        <TitleHeader title="Featured Product" />
      </div>
      <ProductCarousel products={featured} />
    </SpacedContainer>
  );
};

export default FeaturedProduct;
