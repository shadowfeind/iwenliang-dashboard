import { ProductType } from "@/features/products/product.types";
import Image from "next/image";
import Link from "next/link";

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
      <div className="mt-1">
        <p className="text-sm font-semibold text-center text-gray-400">
          USD {product.price}{" "}
          {product?.salePrice !== undefined && product.salePrice > 0 && (
            <span className="line-through">USD {product.salePrice}</span>
          )}
        </p>
        <p className="text-xs text-center hover:underline">Buy now</p>
      </div>
    </Link>
  );
};

export default ProductCard;
