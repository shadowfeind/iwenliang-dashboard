import { ProductType } from "@/features/products/product.types";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

type ProductGridProps = {
  products: ProductType[];
  styles?: string;
};

const ProductsGrid = ({ products, styles }: ProductGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6",
        styles
      )}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
