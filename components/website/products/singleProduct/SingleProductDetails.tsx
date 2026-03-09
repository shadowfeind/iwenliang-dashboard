"use client";

import { Button } from "@/components/ui/button";
import { ProductType } from "@/features/products/product.types";
import React, { useState } from "react";
import {
  ArrowUpRight,
  Minus,
  PackageCheck,
  Plus,
  Ruler,
  ShieldCheck,
} from "lucide-react";
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
  const hasSale =
    typeof data.salePrice === "number" &&
    data.salePrice > 0 &&
    data.salePrice < data.price;
  const displayPrice: number = hasSale ? data.salePrice! : data.price;
  const savings = hasSale ? data.price - displayPrice : 0;

  const detailGroups = [
    {
      label: "Collections",
      values: data.category?.map((item) => item.name).filter(Boolean),
    },
    {
      label: "Stone",
      values: data.material?.map((item) => item.name).filter(Boolean),
    },
    {
      label: "Color",
      values: data.color?.map((item) => item.name).filter(Boolean),
    },
    {
      label: "Bead size",
      values: data.beadSize?.map((item) => item.name).filter(Boolean),
    },
  ].filter((group) => group.values && group.values.length > 0);

  const incrementQuantity = () =>
    setQuantity((prev) => {
      if (prev >= data.stock) return prev;
      return prev + 1;
    });
  const decrementQuantity = () =>
    setQuantity((prev) => {
      if (prev <= 1) return prev;
      return prev - 1;
    });

  const handleCart = () => {
    if (quantity < 1 || data.stock < 1) {
      return;
    }

    addCart({
      product: data,
      quantity,
      wristSize: size,
    });
    setCartOpen(true);
  };

  return (
    <SlideInRight>
      <div className="overflow-hidden rounded-[32px] border border-black/8 bg-white/90 shadow-[0_28px_90px_-60px_rgba(15,23,42,0.45)] backdrop-blur-sm">
        <div className="border-b border-black/8 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.16),_transparent_36%),linear-gradient(180deg,_#fffaf2_0%,_#ffffff_100%)] p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-700">
              {data.stock > 0 ? "Ready to order" : "Sold out"}
            </span>
            {data.featured ? (
              <span className="rounded-full bg-[#f8f0d5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7a5c12]">
                Featured piece
              </span>
            ) : null}
            {data.styleId ? (
              <span className="rounded-full border border-black/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Style {data.styleId}
              </span>
            ) : null}
          </div>
          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-neutral-500">
              Iwenliang bracelet
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-none text-neutral-950 sm:text-5xl">
              {data.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
              {data.description ||
                "A composed bracelet profile built from natural stone, polished metal accents, and a fit shaped around your measurement."}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-end gap-4 border-t border-black/8 pt-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Price
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-4xl font-semibold text-neutral-950">
                  ${displayPrice.toFixed(2)}
                </span>
                {hasSale ? (
                  <span className="text-base text-neutral-400 line-through">
                    ${data.price.toFixed(2)}
                  </span>
                ) : null}
              </div>
            </div>
            {hasSale ? (
              <div className="rounded-full bg-[#d4af37] px-4 py-2 text-sm font-semibold text-black">
                Save ${savings.toFixed(2)}
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div className="rounded-[28px] bg-neutral-950 p-5 text-white sm:p-6">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#f0d47a]">
              <Ruler className="h-4 w-4" />
              Size guidance
            </div>
            <p className="mt-3 text-sm leading-6 text-white/74">
              Enter your wrist measurement in centimeters or inches. We build
              the bracelet around the number you provide.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
              <Input
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="6 inches or 15 cm"
                className="h-12 rounded-full border-white/10 bg-white/10 px-5 text-white placeholder:text-white/45"
              />
              <DrawerDialog
                title="How to measure"
                style="h-12 rounded-full border border-white/15 bg-white/10 text-white hover:bg-white hover:text-black"
              >
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
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)]">
            <div className="inline-flex items-center rounded-full border border-black/10 bg-[#faf7f1] p-1">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                onClick={decrementQuantity}
                disabled={data.stock < 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="min-w-14 text-center text-lg font-semibold text-neutral-950">
                {quantity}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                onClick={incrementQuantity}
                disabled={data.stock < 1}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="lg"
              className="h-14 w-full rounded-full text-xs font-semibold uppercase tracking-[0.28em]"
              disabled={quantity < 1 || data.stock < 1}
              onClick={handleCart}
            >
              {data.stock > 0 ? "Add to cart" : "Sold out"}
              {data.stock > 0 ? <ArrowUpRight className="h-4 w-4" /> : null}
            </Button>
          </div>

          {detailGroups.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {detailGroups.map((group) => (
                <div
                  key={group.label}
                  className="rounded-[24px] border border-black/8 bg-[#fcfaf6] p-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                    {group.label}
                  </p>
                  <p className="mt-3 text-base font-medium text-neutral-900">
                    {group.values?.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-[24px] border border-black/8 bg-white p-4">
              <PackageCheck className="h-5 w-5 text-[#7a5c12]" />
              <p className="mt-3 text-base font-semibold text-neutral-950">
                Premium packaging
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Presented in a craft paper box that is ready for gifting.
              </p>
            </div>
            <div className="rounded-[24px] border border-black/8 bg-white p-4">
              <ShieldCheck className="h-5 w-5 text-[#7a5c12]" />
              <p className="mt-3 text-base font-semibold text-neutral-950">
                Selected materials
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Natural stone beads and sterling silver details chosen for a
                more refined finish.
              </p>
            </div>
            <div className="rounded-[24px] border border-black/8 bg-white p-4">
              <Ruler className="h-5 w-5 text-[#7a5c12]" />
              <p className="mt-3 text-base font-semibold text-neutral-950">
                Wrist-size customization
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Slight size and color variation is part of the natural material
                character of each piece.
              </p>
            </div>
          </div>

          {data.videoUrl ? (
            <a
              href={data.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 transition hover:text-[#7a5c12]"
            >
              View product video
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </SlideInRight>
  );
};

export default SingleProductDetails;
