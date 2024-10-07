import { CategoryType } from "@/config/types/category.types";
import { getAllCategories } from "@/query/category.query";
import CreateViewEditProductForm from "@/components/pages/products/addViewEdit/CreateViewEditProductForm";
import { ErrorComponent } from "@/components/ErrorComponent";
import { getAllColors } from "@/query/color.query";
import { getAllMaterials } from "@/query/material.query";

type Props = {};

const ProductAddPage = async (props: Props) => {
  let error = "";
  let categories: CategoryType[] = [];
  let categoriesName: any[] = [];
  try {
    const [categoriesData, colorsData, materialsData] = await Promise.all([
      getAllCategories(),
      getAllColors(),
      getAllMaterials(),
    ]);

    if ("error" in categoriesData) {
      error = categoriesData.error;
    } else {
      categories = [...categoriesData];

      if (categories.length > 0) {
        // creating labels to show in multi-select component
        categoriesName = categories.map((cat) => {
          return { value: cat._id, label: cat.name };
        });
      }
    }
  } catch (err) {
    error = "An error occurred while fetching data";
    console.error(err);
  }

  return (
    <>
      <ErrorComponent message={error} />
      <CreateViewEditProductForm
        mode="create"
        categoriesName={categoriesName}
      />
    </>
  );
};

export default ProductAddPage;
