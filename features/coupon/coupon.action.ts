import { auth } from "@/auth";
import { createCouponSchema, CreateCouponSchemaType } from "./coupon.schema";
import { allowedRoles } from "@/config/constant/allowedRoles";
import connectDB from "@/config/db/connect";
import Coupon from "./coupon.model";

export async function createCoupon(
  values: CreateCouponSchemaType
): Promise<void | { error: string }> {
  const session = await auth();

  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  const validateFields = createCouponSchema.safeParse(values);
  if (!validateFields.success) return { error: "Validation error" };

  const { code, isActive, validTill } = validateFields.data;

  try {
    await connectDB();
    await Coupon.create({ code, isActive, validTill });
  } catch (error) {
    console.log("Error from createCoupon action", error);
    return { error: "Something went wrong" };
  }
}

export async function updateCoupon(
  values: CreateCouponSchemaType,
  id: string
): Promise<void | { error: string }> {
  const session = await auth();

  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  const validateFields = createCouponSchema.safeParse(values);
  if (!validateFields.success) return { error: "Validation error" };

  const { code, isActive, validTill } = validateFields.data;

  try {
    await connectDB();
    const coupon = await Coupon.findByIdAndUpdate(
      id,
      { code, isActive, validTill },
      { new: true }
    );
    if (!coupon) return { error: "Cannot find coupon" };
  } catch (error) {
    console.log("Error from updateCoupon", error);
    return { error: "Something went wrong" };
  }
}

export async function deleteCoupon(
  id: string
): Promise<void | { error: string }> {
  if (!id) return { error: "id is required" };
  const session = await auth();
  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  try {
    await connectDB();
    await Coupon.findByIdAndDelete(id);
  } catch (error) {
    console.log("Error from deleteCoupon", error);
    return { error: "Something went wrong" };
  }
}
