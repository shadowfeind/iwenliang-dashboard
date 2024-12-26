import { DataTable } from "./components/DataTable";
import { getAllOrdersQuery } from "./order.query";

const OrderPage = async () => {
  const data = await getAllOrdersQuery();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};

export default OrderPage;
