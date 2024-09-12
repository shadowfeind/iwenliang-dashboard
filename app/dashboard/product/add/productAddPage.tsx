import { CategoryType } from "@/config/types/category-types";
import { getAllCategories } from "@/query/category.query";
import CreateViewEditProductForm from "@/components/pages/products/addViewEdit/CreateViewEditProductForm";
import { ErrorComponent } from "@/components/ErrorComponent";

type Props = {};

const ProductAddPage = async (props: Props) => {
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
