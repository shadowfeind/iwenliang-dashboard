import { DataTable } from "./component/DataTable";
import { getAllShippingPrice } from "./shippingPrice.query";

const ShipingPrice = async () => {
  const data = await getAllShippingPrice();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }
  return <DataTable data={data} />;
};

export default ShipingPrice;
