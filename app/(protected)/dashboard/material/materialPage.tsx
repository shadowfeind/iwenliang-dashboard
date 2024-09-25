import { DataTable } from "@/components/pages/materials/DataTable";
import { getAllMaterials } from "@/query/material.query";

const MaterialPage = async () => {
  const data = await getAllMaterials();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};

export default MaterialPage;
