import { getAllCategories } from "@/features/categories/category.query";
import CreateViewEditProductForm from "@/features/products/components/CreateViewEditProductForm";
import { ErrorComponent } from "@/components/ErrorComponent";
import { getAllColors } from "@/features/colors/color.query";
import { getAllMaterials } from "@/features/materials/material.query";
import { multiSelectNameCreator } from "@/lib/utils";

type Props = {};

const ProductAddPage = async (props: Props) => {
  let error = "";
  let categoriesName: any[] = [];
  let colorsName: any[] = [];
  let materialName: any[] = [];

  const [categoriesData, colorsData, materialsData] = await Promise.all([
    getAllCategories(),
    getAllColors(),
    getAllMaterials(),
  ]);

  // Check for errors in categories data
  categoriesName = multiSelectNameCreator(categoriesData, error);

  colorsName = multiSelectNameCreator(colorsData, error);

  materialName = multiSelectNameCreator(materialsData, error);

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <>
      <CreateViewEditProductForm
        mode="create"
        categoriesName={categoriesName}
        colors={colorsName}
        materials={materialName}
      />
    </>
  );
};

export default ProductAddPage;
