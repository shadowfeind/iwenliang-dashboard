import { getProductBySlugQuery } from "@/features/products/product.query";
import ImageGallery from "./ImageGallery";
import SingleProductDetails from "./SingleProductDetails";
import { headers } from "next/headers";
import { isMobile } from "@/lib/utils";

type Props = {
  slug: string;
};

export default async function SingleProduct({ slug }: Props) {
  const data = await getProductBySlugQuery(slug);
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const mobile = isMobile(userAgent);

  if ("error" in data) {
    return (
      <div className="text-center text-red-500 text-xl mt-8">{data.error}</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <ImageGallery images={data.images} />

        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <SingleProductDetails data={data} mobile={mobile} />
        </div>
      </div>
    </div>
  );
}
