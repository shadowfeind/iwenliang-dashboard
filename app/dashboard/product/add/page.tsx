import ImageUpload from "@/components/ImageUpload";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import React from "react";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Products", link: "/dashboard/product" },
  { title: "Add" },
];

const Page = () => {
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <ImageUpload size={2} maxFiles={4} />
    </MainContainer>
  );
};

export default Page;
