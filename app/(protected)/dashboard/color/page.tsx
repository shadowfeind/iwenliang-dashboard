import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import React from "react";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Color" },
];

const page = () => {
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
    </MainContainer>
  );
};

export default page;
