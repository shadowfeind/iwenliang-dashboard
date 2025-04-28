"use client";

import { useState } from "react";
import Image from "next/image";
import { SlideInLeft } from "@/components/animation/SlideInLeft";

type ImageGalleryProps = {
  images: string[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <SlideInLeft>
      <div className="flex flex-col space-y-4">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={images[currentImage]}
            alt={images[currentImage]}
            width={600}
            height={600}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex space-x-4 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`shrink-0 px-2 ${
                index === currentImage ? "border-2 border-gray-500" : ""
              }`}
            >
              <Image
                src={image}
                alt={`${image} thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="h-24 w-24 rounded-md object-cover object-center"
              />
            </button>
          ))}
        </div>
      </div>
    </SlideInLeft>
  );
};

export default ImageGallery;
