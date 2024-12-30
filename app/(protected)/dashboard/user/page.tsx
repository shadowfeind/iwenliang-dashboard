import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import React, { Suspense } from "react";
import UserPage from "../../../../features/users/userPage";
import { TableLoading } from "@/components/loading/tableLoading";
import { auth } from "@/auth";
import { allowedRoles } from "@/config/constant/allowedRoles";
import Unauthorized from "@/components/auth/Unauthorized";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Users" },
];

const Page = async () => {
  const session = await auth();

  if (!session || !allowedRoles.includes(session.user.role)) {
    return <Unauthorized />;
  }
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <div>Users</div>
      <Suspense fallback={<TableLoading />}>
        <UserPage />
      </Suspense>
    </MainContainer>
  );
};

export default Page;
