import { DataTable } from "./components/DataTable";
import { getAllPromoHeader } from "./promoHeader.query";

const PromoHeader = async () => {
  const data = await getAllPromoHeader();
  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};

export default PromoHeader;
