import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
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
    </MainContainer>
  );
};

export default UsersPage;
