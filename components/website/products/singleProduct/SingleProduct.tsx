import { getProductBySlugQuery } from "@/features/products/product.query";
import ImageGallery from "./ImageGallery";
import SingleProductDetails from "./SingleProductDetails";

type Props = {
  slug: string;
};

export default async function SingleProduct({ slug }: Props) {
  const data = await getProductBySlugQuery(slug);

  if ("error" in data) {
    return (
      <div className="text-center text-red-500 text-xl mt-8">{data.error}</div>
    );
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.12),_transparent_48%)]" />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] xl:gap-12">
          <ImageGallery images={data.images} />
          <div className="px-0">
            <SingleProductDetails data={data} />
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-black/8 bg-white/85 p-5 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.45)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Made for you
            </p>
            <h3 className="mt-3 font-serif text-2xl text-neutral-950">
              Tailored wrist sizing
            </h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Every order is sized around the wrist measurement you provide at
              checkout.
            </p>
          </div>
          <div className="rounded-[24px] border border-black/8 bg-white/85 p-5 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.45)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Material quality
            </p>
            <h3 className="mt-3 font-serif text-2xl text-neutral-950">
              Natural stones and silver accents
            </h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Crafted with selected beads and premium metal details for a
              cleaner luxury finish.
            </p>
          </div>
          <div className="rounded-[24px] border border-black/8 bg-white/85 p-5 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.45)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Packaging
            </p>
            <h3 className="mt-3 font-serif text-2xl text-neutral-950">
              Ready for gifting
            </h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Each bracelet arrives in a presentation-ready box with a premium,
              understated finish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
