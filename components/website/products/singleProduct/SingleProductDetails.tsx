"use client";

import { Button } from "@/components/ui/button";
import { ProductType } from "@/features/products/product.types";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DrawerDialog } from "../../DrawerDialog";
import Image from "next/image";
import { isMobile } from "@/lib/utils";
import { useMainStore } from "@/config/store/useMainStore";
import { SlideInRight } from "@/components/animation/SlideInRight";

type Props = {
  data: ProductType;
};

const SingleProductDetails = ({ data }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<string>("");
  const mobile = isMobile();
  const addCart = useMainStore((state) => state.addCart);
  const setCartOpen = useMainStore((state) => state.setCartOpen);

  const incrementQuantity = () =>
    setQuantity((prev) => {
      if (prev > data.stock) return prev;
      return prev + 1;
    });
  const decrementQuantity = () =>
    setQuantity((prev) => {
      if (prev < 1) return prev;
      return prev - 1;
    });

  const handleCart = () => {
    addCart({
      product: data,
      quantity,
      wristSize: size,
    });
    setCartOpen(true);
  };

  return (
    <SlideInRight>
      <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
        {data.name}
      </h1>
      <div className="mt-3">
        <p className="text-3xl text-gray-900 flex items-center">
          ${data.price.toFixed(2)}
          {data?.salePrice ? (
            <span className="ml-2 text-sm text-gray-600 line-through">
              ${data?.salePrice.toFixed(2)}
            </span>
          ) : (
            ""
          )}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <p className="text-base text-gray-700">{data.description}</p>
      </div>
      <div className="w-full md:w-4/6">
        <p className="mb-2 text-semibold text-sm">
          Size of your wrist in cm / inches
        </p>
        <Input
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="6 inches or 15 cm"
        />
        <DrawerDialog title="How to measure" style="mt-4">
          <Image
            src={
              mobile
                ? "/images/mobileMeasurement.png"
                : "/images/measurement.png"
            }
            width={800}
            height={800}
            alt="measurement"
          />
        </DrawerDialog>

        <div className="mt-8 flex items-center space-x-4">
          <Button size="sm" variant="outline" onClick={decrementQuantity}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-xl font-semibold">{quantity}</span>
          <Button size="sm" variant="outline" onClick={incrementQuantity}>
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            className="w-full"
            disabled={quantity < 1}
            onClick={handleCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <div className="mt-4 text-sm">
          <p className="font-semibold text-black text-lg">Description</p>
          <div className=" text-gray-500">
            <p>High quality selected beads and solid S925 Silver spacer</p>
            <p>
              All natural stones with premium quality selected. Size and color
              may slightly vary.
            </p>
            <ul className="list-disc pl-5">
              <li>AA graded natural stone beads</li>
              <li>925 sterling Silver</li>
              <li>Hand-crafted</li>
              <li>Craft paper box packaging</li>
            </ul>
          </div>
          <h5 className="mt-4 text-sm">STYLE ID: 123456</h5>
        </div>
      </div>
    </SlideInRight>
  );
};

export default SingleProductDetails;
