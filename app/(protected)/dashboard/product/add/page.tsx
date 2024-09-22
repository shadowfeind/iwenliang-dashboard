import { ErrorComponent } from "@/components/ErrorComponent";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";

import { PRODUCT_ROUTE } from "@/config/constant/routes";
import ProductAddPage from "./productAddPage";
import { ProductLoading } from "@/components/loading/productLoading";
import { Suspense } from "react";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Products", link: PRODUCT_ROUTE },
  { title: "Add" },
];

const Page = () => {
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <Suspense fallback={<ProductLoading />}>
        <ProductAddPage />
      </Suspense>
    </MainContainer>
  );
};

export default Page;
