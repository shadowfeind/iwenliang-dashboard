import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import React, { Suspense } from "react";
import MaterialPage from "../../../../features/materials/materialPage";
import { TableLoading } from "@/components/loading/tableLoading";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Material" },
];

const page = () => {
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <Suspense fallback={<TableLoading />}>
        <MaterialPage />
      </Suspense>
    </MainContainer>
  );
};

export default page;
