import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { TableLoading } from "@/components/loading/tableLoading";
import React, { Suspense } from "react";
import ColorPage from "@/features/colors/colorPage";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Color" },
];

const page = () => {
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <Suspense fallback={<TableLoading />}>
        <ColorPage />
      </Suspense>
    </MainContainer>
  );
};

export default page;
