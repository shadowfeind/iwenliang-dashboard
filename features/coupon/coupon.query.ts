import { auth } from "@/auth";
import { CouponType } from "./coupon.schema";
import { allowedRoles } from "@/config/constant/allowedRoles";
import Coupon from "./coupon.model";

export async function getAllCoupon(): Promise<
  CouponType[] | { error: string }
> {
  const session = await auth();
  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unautorized" };

  try {
    const coupons = await Coupon.find({ isActive: true }).lean<CouponType[]>();
    return coupons.map((coupon) => ({
      ...coupon,
      _id: coupon._id?.toString(),
    }));
  } catch (error) {
    console.log("error from query getAllCoupon", error);
    return { error: "Someting went wrong" };
  }
}
