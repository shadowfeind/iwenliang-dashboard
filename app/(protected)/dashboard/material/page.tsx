import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import React, { Suspense } from "react";
import MaterialPage from "../../../../features/materials/materialPage";
import { TableLoading } from "@/components/loading/tableLoading";
import { auth } from "@/auth";
import { allowedRoles } from "@/config/constant/allowedRoles";
import Unauthorized from "@/components/auth/Unauthorized";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Stone" },
];

const page = async () => {
  const session = await auth();

  if (!session || !allowedRoles.includes(session.user.role)) {
    return <Unauthorized />;
  }
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
