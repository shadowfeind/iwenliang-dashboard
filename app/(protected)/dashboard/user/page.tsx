import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import React, { Suspense } from "react";
import UserPage from "../../../../features/users/userPage";
import { TableLoading } from "@/components/loading/tableLoading";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Users" },
];

const Page = () => {
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
