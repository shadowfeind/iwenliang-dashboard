import CarouselLoading from "@/components/loading/carouselLoading";
import MainCarousel from "@/components/website/MainCarousel";
import { isMobile } from "@/config/lib/utils";
import { headers } from "next/headers";
import { Suspense } from "react";

const page = async () => {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const mobile = isMobile(userAgent);
  return (
    <div>
      {!mobile && (
        <Suspense fallback={<CarouselLoading />}>
          <MainCarousel />
        </Suspense>
      )}
    </div>
  );
};

export default page;
