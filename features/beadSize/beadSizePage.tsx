import { getAllBeadSizeQuery } from "./beadSize.query";
import { DataTable } from "./components/DataTable";

export const BeadSizePage = async () => {
  const data = await getAllBeadSizeQuery();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};
