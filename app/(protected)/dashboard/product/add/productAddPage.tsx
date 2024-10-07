import { CategoryType } from "@/config/types/category.types";
import { getAllCategories } from "@/query/category.query";
import CreateViewEditProductForm from "@/components/pages/products/addViewEdit/CreateViewEditProductForm";
import { ErrorComponent } from "@/components/ErrorComponent";
import { getAllColors } from "@/query/color.query";
import { getAllMaterials } from "@/query/material.query";
import { ColorType } from "@/config/types/color.types";
import { MaterialType } from "@/config/types/material.types";
import { error } from "console";

type Props = {};

export type MultiSelectType = {
  label: string;
  value: string;
};

const multiSelectNameCreator = (result: any, errorToSet: any) => {
  if ("error" in result) {
    errorToSet = result.error;
    return;
  }

  return result.map((value: any) => {
    return { value: value._id, label: value.name };
  });
};

const ProductAddPage = async (props: Props) => {
  let error = "";
  let categoriesName: MultiSelectType[] = [];
  let colorsName: MultiSelectType[] = [];
  let materialName: MultiSelectType[] = [];

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
