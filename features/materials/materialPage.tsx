import { getAllMaterialsQuery } from "@/features/materials/material.query";
import { DataTable } from "./components/DataTable";

const MaterialPage = async () => {
  const data = await getAllMaterialsQuery();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};

export default MaterialPage;
