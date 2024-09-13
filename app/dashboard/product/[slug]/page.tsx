import React from "react";
import { ErrorComponent } from "@/components/ErrorComponent";
import MainContainer from "@/components/layout/MainContainer";
import { PRODUCT_ROUTE } from "@/config/constant/routes";
import { CategoryType } from "@/config/types/category.types";
import { getAllCategories } from "@/query/category.query";
import { getProductBySlug } from "@/query/product.query";
import ProductSlugPage from "./productSlugPage";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Products", link: PRODUCT_ROUTE },
  { title: "View" },
];

type Props = {
  params: { slug: string };
};

const Page = async ({ params }: Props) => {
  const [productData, categoryData] = await Promise.all([
    getProductBySlug(params.slug),
    getAllCategories(),
  ]);

  if ("error" in productData) {
    return (
      <MainContainer>
        <BreadCrumbsComponent items={breadcrumbs} />
        <ErrorComponent message={productData.error} />
      </MainContainer>
    );
  }

  const categories: CategoryType[] =
    "error" in categoryData ? [] : categoryData;
  const categoriesName = categories.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <ProductSlugPage data={productData} categoriesName={categoriesName} />
    </MainContainer>
  );
};

export default Page;
