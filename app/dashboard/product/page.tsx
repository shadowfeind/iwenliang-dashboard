import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { TableLoading } from "@/components/loading/tableLoading";
import React, { Suspense } from "react";
import ProductPage from "./productPage";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Products" },
];

const Page = () => {
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <div>Products</div>
      <Suspense fallback={<TableLoading />}>
        <ProductPage />
      </Suspense>
    </MainContainer>
  );
};

export default Page;
