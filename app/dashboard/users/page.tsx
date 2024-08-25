import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import React, { Suspense } from "react";
import UserPage from "./userPage";
import { TableLoading } from "@/components/loading/tableLoading";

type Props = {};

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Users" },
];

const UsersPage = (props: Props) => {
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

export default UsersPage;
