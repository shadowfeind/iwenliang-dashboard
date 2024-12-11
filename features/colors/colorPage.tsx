import { getAllColorsQuery } from "@/features/colors/color.query";
import React from "react";
import { DataTable } from "./components/DataTable";

const ColorPage = async () => {
  const data = await getAllColorsQuery();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};

export default ColorPage;
