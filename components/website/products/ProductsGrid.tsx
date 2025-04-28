"use client";

import { ProductType } from "@/features/products/product.types";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type ProductGridProps = {
  products: ProductType[];
  styles?: string;
};

const ProductsGrid = ({ products, styles }: ProductGridProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div
        className={cn(
          "grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-6 transition-all duration-300 ease-in-out",
          styles
        )}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProductsGrid;
