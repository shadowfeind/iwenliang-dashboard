import { DataTable } from "@/components/pages/colors/DataTable";
import { getAllColors } from "@/query/color.query";
import React from "react";

const ColorPage = async () => {
  const data = await getAllColors();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};

export default ColorPage;
