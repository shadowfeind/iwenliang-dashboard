import { getAllCategoriesQuery } from "@/features/categories/category.query";
import { DataTable } from "./components/DataTable";

const CategoryPage = async () => {
  const data = await getAllCategoriesQuery();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};

export default CategoryPage;
