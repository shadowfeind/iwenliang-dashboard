import { ErrorComponent } from "@/components/ErrorComponent";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import AddViewEditProductForm from "@/components/pages/products/addViewEdit/AddViewEditProductForm";
import { CategoryType } from "@/config/types/category-types";
import { getAllCategories } from "@/query/category.query";
import React from "react";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Products", link: "/dashboard/product" },
  { title: "Add" },
];

const Page = async () => {
  let error = "";
  let categories: CategoryType[] = [];
  let categoriesName: string[] = [];
  const data = await getAllCategories();
  if ("error" in data) {
    error = data.error;
  } else {
    categories = [...data];
    if (data.length > 0) {
      categories.forEach((cat) => categoriesName.push(cat.name));
    }
  }

  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <ErrorComponent message={error} />
      <AddViewEditProductForm
        mode="add"
        categories={categories}
        categoriesName={categoriesName}
      />
    </MainContainer>
  );
};

export default Page;
