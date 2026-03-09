import { ProductType } from "@/features/products/product.types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: ProductType;
};

const ProductCard = ({ product }: Props) => {
  const hasSale =
    typeof product.salePrice === "number" &&
    product.salePrice > 0 &&
    product.salePrice < product.price;
  const displayPrice: number = hasSale ? product.salePrice! : product.price;
  const savings = hasSale ? Math.round(product.price - displayPrice) : 0;
  const primaryTag =
    product.category?.[0]?.name ||
    product.material?.[0]?.name ||
    product.color?.[0]?.name ||
    "Signature";

  return (
    <Link href={`/bracelets/${product.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_32px_100px_-45px_rgba(15,23,42,0.55)]">
        <div className="relative aspect-[640/422] overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_45%),linear-gradient(180deg,_#f8f4ec_0%,_#efe7d6_100%)]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain object-center p-4 transition duration-700 group-hover:scale-[1.04] group-hover:brightness-[0.97]"
            sizes="(min-width: 1540px) 348px, (min-width: 1280px) 284px, (min-width: 1040px) 309px, (min-width: 780px) 348px, (min-width: 640px) 284px, calc(100vw - 32px)"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent opacity-80 transition duration-500 group-hover:opacity-100" />
          <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
            <span className="rounded-full border border-white/40 bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-900 backdrop-blur-sm">
              {primaryTag}
            </span>
            {hasSale ? (
              <span className="rounded-full bg-[#d4af37] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-black shadow-md">
                Save ${savings}
              </span>
            ) : null}
          </div>
          <div className="absolute inset-x-4 bottom-4 flex translate-y-4 items-end justify-between gap-4 rounded-[22px] border border-white/15 bg-black/35 px-4 py-3 text-white opacity-0 backdrop-blur-md transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/65">
                Handcrafted bracelet
              </p>
              <p className="truncate text-sm font-medium">
                Tailored to your wrist size
              </p>
            </div>
            <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f0d47a]">
              Explore
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 px-4 pb-5 pt-4 sm:px-5">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500">
              Iwenliang Collection
            </p>
            <h3 className="font-serif text-lg leading-snug text-neutral-950 transition-colors duration-300 group-hover:text-[#7a5c12] sm:text-[1.35rem]">
              {product.name}
            </h3>
            <p className="min-h-10 text-sm leading-6 text-neutral-600">
              {product.description ||
                "Natural stones, refined hardware, and a cleaner silhouette built for everyday wear."}
            </p>
          </div>
          <div className="mt-auto flex items-end justify-between gap-4 border-t border-black/6 pt-4">
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.26em] text-neutral-400">
                Price
              </p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-neutral-950">
                  ${displayPrice.toFixed(2)}
                </span>
                {hasSale ? (
                  <span className="text-sm text-neutral-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                ) : null}
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center rounded-full border border-[#d4af37]/45 bg-[#f8f0d5] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7a5c12] transition duration-300 group-hover:border-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black">
              View piece
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
