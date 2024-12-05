"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";

import { ChevronLeft, ChevronRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";
import { ProductType } from "@/features/products/product.types";

interface ProductCarouselProps {
  products: ProductType[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform bg-white p-2 rounded-full shadow-md"
      >
        <ChevronLeft className="h-6 w-6 text-gray-600" />
      </button>
    );
  };

  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform bg-white p-2 rounded-full shadow-md"
      >
        <ChevronRight className="h-6 w-6 text-gray-600" />
      </button>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="relative px-4 py-16">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id} className="px-2">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
