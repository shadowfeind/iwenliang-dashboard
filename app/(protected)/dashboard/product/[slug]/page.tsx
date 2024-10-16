import React from "react";
import { ErrorComponent } from "@/components/ErrorComponent";
import MainContainer from "@/components/layout/MainContainer";
import { PRODUCT_ROUTE } from "@/config/constant/routes";
import { getAllCategories } from "@/query/category.query";
import { getProductBySlug } from "@/query/product.query";
import ProductSlugPage from "./productSlugPage";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import { getAllColors } from "@/query/color.query";
import { getAllMaterials } from "@/query/material.query";
import { multiSelectNameCreator } from "@/lib/utils";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Products", link: PRODUCT_ROUTE },
  { title: "View" },
];

type Props = {
  params: { slug: string };
};

const Page = async ({ params }: Props) => {
  let error = "";
  const [productData, categoryData, colorsData, materialsData] =
    await Promise.all([
      getProductBySlug(params.slug),
      getAllCategories(),
      getAllColors(),
      getAllMaterials(),
    ]);

  if ("error" in productData) {
    return (
      <MainContainer>
        <BreadCrumbsComponent items={breadcrumbs} />
        <ErrorComponent message={productData.error} />
      </MainContainer>
    );
  }

  const categoriesName: any[] = multiSelectNameCreator(categoryData, error);

  const colorsName: any[] = multiSelectNameCreator(colorsData, error);

  const materialName: any[] = multiSelectNameCreator(materialsData, error);

  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <ProductSlugPage
        data={productData}
        categoriesName={categoriesName}
        colorsName={colorsName}
        materialName={materialName}
      />
    </MainContainer>
  );
};

export default Page;
