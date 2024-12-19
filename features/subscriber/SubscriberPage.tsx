import { DataTable } from "./components/DataTable";
import { getAllSubscriberQuery } from "./subscriber.query";

export const SubscriberPage = async () => {
  const data = await getAllSubscriberQuery();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};
