"use client";

import { Button } from "@/components/ui/button";
import { ProductType } from "@/features/products/product.types";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DrawerDialog } from "../../DrawerDialog";
import Image from "next/image";

type Props = {
  data: ProductType;
  mobile: boolean;
};

type SingleProductErrorType = {
  sizeError: string;
  quantityError: string;
};
const SingleProductDetails = ({ data, mobile }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<string>("");
  const [error, setError] = useState<SingleProductErrorType>({
    sizeError: "",
    quantityError: "",
  });
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => prev - 1);

  return (
    <>
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
        <DrawerDialog mobile={mobile} title="How to measure" style="mt-4">
          <Image
            src="/images/measurement.png"
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
          <Button size="sm" className="w-full">
            Add to Cart
          </Button>
        </div>
        <div className="mt-4">
          <Button size="sm" variant="secondary" className="w-full">
            Buy Now
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
    </>
  );
};

export default SingleProductDetails;
