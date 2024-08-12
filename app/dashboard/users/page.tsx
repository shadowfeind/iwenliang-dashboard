import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { DataTable } from "@/components/users/DataTable";
import React from "react";

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
      <DataTable />
    </MainContainer>
  );
};

export default UsersPage;
