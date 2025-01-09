"use server";

import { auth } from "@/auth";
import {
  CouponType,
  createCouponSchema,
  CreateCouponSchemaType,
} from "./coupon.schema";
import { allowedRoles } from "@/config/constant/allowedRoles";
import connectDB from "@/config/db/connect";
import Coupon from "./coupon.model";
import { revalidatePath } from "next/cache";
import { COUPON_ROUTE } from "@/config/constant/routes";

export async function createCoupon(
  values: CreateCouponSchemaType
): Promise<void | { error: string }> {
  const session = await auth();

  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  const validateFields = createCouponSchema.safeParse(values);
  if (!validateFields.success) return { error: "Validation error" };

  const { code, isActive, validTill, discountType, discountValue } =
    validateFields.data;

  try {
    await connectDB();
    const test = await Coupon.create({
      code,
      isActive,
      validTill,
      discountType,
      discountValue,
    });
    console.log(test);
    revalidatePath(COUPON_ROUTE);
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

  const { code, isActive, validTill, discountType, discountValue } =
    validateFields.data;

  try {
    await connectDB();
    await Coupon.findByIdAndUpdate(
      id,
      { code, isActive, validTill, discountType, discountValue },
      { new: true }
    );
    revalidatePath(COUPON_ROUTE);
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
    revalidatePath(COUPON_ROUTE);
  } catch (error) {
    console.log("Error from deleteCoupon", error);
    return { error: "Something went wrong" };
  }
}

export async function checkCoupon(
  code: string
): Promise<CouponType | { error: string }> {
  try {
    await connectDB();
    const coupon = await Coupon.findOne({
      code,
      isActive: true,
    }).lean<CouponType>();
    if (!coupon) return { error: "Coupon not found" };
    return { ...coupon, _id: coupon._id?.toString() };
  } catch (error) {
    console.log("Error from checkCoupon", error);
    return { error: "Something went wrong" };
  }
}
