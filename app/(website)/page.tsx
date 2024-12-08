import { ErrorComponent } from "@/components/ErrorComponent";
import CarouselLoading from "@/components/loading/carouselLoading";
import FeaturedProduct from "@/components/website/homePage/FeaturedProduct";
import MainCarousel from "@/components/website/MainCarousel";
import ProductsGrid from "@/components/website/products/ProductsGrid";
import SpacedContainer from "@/components/website/SpacedContainer";
import TitleHeader from "@/components/website/TitleHeader";
import { getProductsForFrontPage } from "@/features/products/product.query";
import { isMobile } from "@/lib/utils";
import { headers } from "next/headers";
import { Suspense } from "react";

const page = async () => {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const mobile = isMobile(userAgent);
  const result = await getProductsForFrontPage();

  if ("error" in result) return <ErrorComponent message={result.error} />;
  return (
    <div>
      {!mobile && (
        <Suspense fallback={<CarouselLoading />}>
          <MainCarousel />
        </Suspense>
      )}
      <FeaturedProduct featured={result.featured} />
      <SpacedContainer>
        <TitleHeader title="Our Products" width="w-20" />
        <ProductsGrid products={result.products} />
      </SpacedContainer>
    </div>
  );
};

export default page;
