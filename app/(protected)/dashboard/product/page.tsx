import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { TableLoading } from "@/components/loading/tableLoading";
import React, { Suspense } from "react";
import ProductPage from "../../../../features/products/productPage";
import { auth } from "@/auth";
import { allowedRoles } from "@/config/constant/allowedRoles";
import Unauthorized from "@/components/auth/Unauthorized";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Products" },
];

const Page = async () => {
  const session = await auth();

  if (!session || !allowedRoles.includes(session.user.role)) {
    return <Unauthorized />;
  }
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
