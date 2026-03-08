import { ProductType } from "@/features/products/product.types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: ProductType;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/bracelets/${product.slug}`} className="group block">
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
      <h3 className="mt-4 text-[13px] md:text-sm text-gray-800 tracking-wide uppercase truncate text-center font-medium transition-colors group-hover:text-black">
        {product.name}
      </h3>
      <div className="mt-1 flex flex-col items-center gap-1.5">
        <p className="text-sm font-medium text-center text-gray-500">
          {product?.salePrice !== undefined && product.salePrice > 0 ? (
            <>
              <span className="text-red-700/80 mr-2">USD {product.price}</span>
              <span className="line-through text-muted-foreground text-xs delay-75">
                USD {product.salePrice}
              </span>
            </>
          ) : (
            <span>USD {product.price}</span>
          )}
        </p>
        <span className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out text-[10px] md:text-xs uppercase tracking-wider font-semibold border border-gray-300 text-gray-700 rounded-full px-3 py-1 hover:bg-black hover:text-white hover:border-black mt-1">
          Buy now
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
