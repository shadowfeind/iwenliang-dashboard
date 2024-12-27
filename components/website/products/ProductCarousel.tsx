"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnFocus: false,
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
