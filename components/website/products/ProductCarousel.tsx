"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductType } from "@/features/products/product.types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProductCarouselProps {
  products: ProductType[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    handleSelect();
    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || products.length <= 1) {
      return;
    }

    const autoplay = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
        return;
      }

      api.scrollTo(0);
    }, 4500);

    return () => window.clearInterval(autoplay);
  }, [api, products.length]);

  if (!products.length) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-black/8 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.14),_transparent_28%),linear-gradient(180deg,_#fffaf2_0%,_#ffffff_100%)] px-4 py-6 shadow-[0_24px_80px_-56px_rgba(15,23,42,0.45)] md:px-6 md:py-8">
      <div className="mb-6 flex items-center justify-between gap-4 px-1 md:mb-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Featured edit
          </p>
          <h3 className="mt-2 font-serif text-2xl text-neutral-950 md:text-3xl">
            A rotating selection of our strongest bracelet designs.
          </h3>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-black/10 bg-white"
            onClick={() => api?.scrollPrev()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-black/10 bg-white"
            onClick={() => api?.scrollNext()}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: products.length > 4 }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 md:-ml-5">
          {products.map((product) => (
            <CarouselItem
              key={product._id}
              className="basis-[86%] pl-3 sm:basis-1/2 md:pl-5 lg:basis-1/3 xl:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {products.length > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-2">
          {products.map((product, index) => (
            <button
              key={product._id}
              type="button"
              aria-label={`Go to featured product ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-10 bg-neutral-950"
                  : "w-2.5 bg-neutral-300 hover:bg-neutral-500"
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ProductCarousel;
