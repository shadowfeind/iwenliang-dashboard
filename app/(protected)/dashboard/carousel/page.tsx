import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { TableLoading } from "@/components/loading/tableLoading";
import CarouselPage from "@/features/carousel/carouselPage";
import { Suspense } from "react";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Carousel" },
];

const page = () => {
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <Suspense fallback={<TableLoading />}>
        <CarouselPage />
      </Suspense>
    </MainContainer>
  );
};

export default page;
