import { DataTable } from "./components/DataTable";
import { getAllShipping } from "./shipping.query";

export const ShippingPage = async () => {
  const data = await getAllShipping();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};
