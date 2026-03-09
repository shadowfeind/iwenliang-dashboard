"use client";

import { useState } from "react";
import Image from "next/image";
import { SlideInLeft } from "@/components/animation/SlideInLeft";
import { ArrowLeft, ArrowRight } from "lucide-react";

type ImageGalleryProps = {
  images: string[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const hasImages = images.length > 0;

  if (!hasImages) {
    return (
      <SlideInLeft>
        <div className="flex min-h-[520px] items-center justify-center rounded-[32px] border border-dashed border-black/10 bg-[#faf6ef] p-8 text-center text-neutral-500">
          Product imagery will appear here once images are available.
        </div>
      </SlideInLeft>
    );
  }

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <SlideInLeft>
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-[32px] border border-black/8 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_34%),linear-gradient(180deg,_#f8f4ec_0%,_#f2ebe0_100%)] p-3 shadow-[0_30px_100px_-60px_rgba(15,23,42,0.4)] sm:p-4">
          <div className="absolute left-6 top-6 z-10 rounded-full border border-white/60 bg-white/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-800 backdrop-blur-sm">
            {String(currentImage + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </div>
          {images.length > 1 ? (
            <div className="absolute inset-x-5 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between">
              <button
                type="button"
                aria-label="Previous product image"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-black/25 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
                onClick={goToPrevious}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next product image"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-black/25 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
                onClick={goToNext}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : null}
          <div className="relative aspect-[4/4.5] overflow-hidden rounded-[26px] bg-white sm:aspect-[4/4.3]">
            <Image
              src={images[currentImage]}
              alt={`Product image ${currentImage + 1}`}
              fill
              className="object-cover object-center"
              sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 100vw"
              priority={currentImage === 0}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentImage(index)}
              className={`relative overflow-hidden rounded-[22px] border p-1 transition ${
                index === currentImage
                  ? "border-neutral-950 bg-neutral-950/5 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.45)]"
                  : "border-black/8 bg-white hover:border-black/20"
              }`}
            >
              <Image
                src={image}
                alt={`${image} thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="aspect-square w-full rounded-[16px] object-cover object-center"
              />
            </button>
          ))}
        </div>
      </div>
    </SlideInLeft>
  );
};

export default ImageGallery;
