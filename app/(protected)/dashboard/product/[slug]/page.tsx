import React from "react";
import { ErrorComponent } from "@/components/ErrorComponent";
import MainContainer from "@/components/layout/MainContainer";
import { PRODUCT_ROUTE } from "@/config/constant/routes";
import { getAllCategories } from "@/features/categories/category.query";
import { getProductBySlug } from "@/features/products/product.query";
import ProductSlugPage from "../../../../../features/products/productSlugPage";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import { getAllColors } from "@/features/colors/color.query";
import { getAllMaterials } from "@/features/materials/material.query";
import { multiSelectNameCreator } from "@/lib/utils";
import { getAllBeadSizeQuery } from "@/features/beadSize/beadSize.query";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Products", link: PRODUCT_ROUTE },
  { title: "View" },
];

type Props = {
  params: Promise<{ slug: string }>;
};

const Page = async (props: Props) => {
  const params = await props.params;
  let error = "";
  const [productData, categoryData, colorsData, materialsData, beadSizeData] =
    await Promise.all([
      getProductBySlug(params.slug),
      getAllCategories(),
      getAllColors(),
      getAllMaterials(),
      getAllBeadSizeQuery(),
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

  const beadSizeName: any[] = multiSelectNameCreator(beadSizeData, error);

  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <ProductSlugPage
        data={productData}
        categoriesName={categoriesName}
        colorsName={colorsName}
        materialName={materialName}
        beadSizeName={beadSizeName}
      />
    </MainContainer>
  );
};

export default Page;
