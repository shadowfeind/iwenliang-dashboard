import { UserTypes } from "../users/users.types";
import { DataTable } from "./components/DataTable";
import { getAllOrdersQuery } from "./order.query";

const OrderPage = async ({ role }: { role: string }) => {
  const data = await getAllOrdersQuery();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} role={role} />;
};

export default OrderPage;
