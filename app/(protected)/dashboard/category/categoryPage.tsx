import { DataTable } from "@/components/pages/categories/DataTable";
import { getAllCategories } from "@/query/category.query";

const CategoryPage = async () => {
  const data = await getAllCategories();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};

export default CategoryPage;
