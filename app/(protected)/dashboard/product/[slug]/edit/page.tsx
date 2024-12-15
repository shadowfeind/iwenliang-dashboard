import { ErrorComponent } from "@/components/ErrorComponent";
import MainContainer from "@/components/layout/MainContainer";
import { PRODUCT_ROUTE } from "@/config/constant/routes";
import { CategoryType } from "@/features/categories/category.types";
import { getAllCategories } from "@/features/categories/category.query";
import { getProductBySlug } from "@/features/products/product.query";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import ProductEditPage from "@/features/products/productEditPage";
import { getAllColors } from "@/features/colors/color.query";
import { getAllMaterials } from "@/features/materials/material.query";
import { getAllBeadSizeQuery } from "@/features/beadSize/beadSize.query";
import { multiSelectNameCreator } from "@/lib/utils";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Products", link: PRODUCT_ROUTE },
  { title: "Edit" },
];

type Props = {
  params: Promise<{ slug: string }>;
};

const Page = async (props: Props) => {
  const params = await props.params;
  let error = "";
  let categoriesName: any[] = [];
  let colorsName: any[] = [];
  let materialName: any[] = [];
  let beadSizeName: any[] = [];

  const [productData, categoriesData, colorsData, materialsData, beadSizeData] =
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

  categoriesName = multiSelectNameCreator(categoriesData, error);

  colorsName = multiSelectNameCreator(colorsData, error);

  materialName = multiSelectNameCreator(materialsData, error);

  beadSizeName = multiSelectNameCreator(beadSizeData, error);

  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <ProductEditPage
        data={productData}
        categoriesName={categoriesName}
        colors={colorsName}
        materials={materialName}
        beadSizes={beadSizeName}
      />
    </MainContainer>
  );
};

export default Page;
