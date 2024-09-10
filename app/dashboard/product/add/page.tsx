import { ErrorComponent } from "@/components/ErrorComponent";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import AddViewEditProductForm from "@/components/pages/products/addViewEdit/AddViewEditProductForm";
import { PRODUCT_ROUTE } from "@/config/constant/routes";
import { CategoryType } from "@/config/types/category-types";
import { getAllCategories } from "@/query/category.query";
import React from "react";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Products", link: PRODUCT_ROUTE },
  { title: "Add" },
];

const Page = async () => {
  let error = "";
  let categories: CategoryType[] = [];
  let categoriesName: any[] = [];
  const data = await getAllCategories();
  if ("error" in data) {
    error = data.error;
  } else {
    categories = [...data];
    if (data.length > 0) {
      categoriesName = categories.map((cat) => {
        return { value: cat._id, label: cat.name };
      });
    }
  }

  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <ErrorComponent message={error} />
      <AddViewEditProductForm mode="create" categoriesName={categoriesName} />
    </MainContainer>
  );
};

export default Page;
