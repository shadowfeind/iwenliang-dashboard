import { DataTable } from "./components/DataTable";
import { getAllCustomersQuery } from "./customer.query";

const CustomerPage = async () => {
  const data = await getAllCustomersQuery();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};

export default CustomerPage;
