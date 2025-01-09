import { DataTable } from "./component/DataTable";
import { getAllCoupon } from "./coupon.query";

export const CouponPage = async () => {
  const data = await getAllCoupon();
  console.log(data);

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};
