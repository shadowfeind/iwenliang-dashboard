import { ProductType } from "@/features/products/product.types";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

type Props = {
  product: ProductType;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/product/${product._id}`} className="group block">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={1200}
          height={1200}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
          sizes="(min-width: 1540px) 348px, (min-width: 1280px) 284px, (min-width: 1040px) 309px, (min-width: 780px) 348px, (min-width: 640px) 284px, calc(100vw - 32px)"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700 truncate text-center font-semibold">
        {product.name}
      </h3>
      <div className="mt-1 flex items-center justify-between">
        <p className="text-lg font-medium text-gray-900">{product.price}</p>
        {/* <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400" />
          <span className="ml-1 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
        </div> */}
      </div>
    </Link>
  );
};

export default ProductCard;
