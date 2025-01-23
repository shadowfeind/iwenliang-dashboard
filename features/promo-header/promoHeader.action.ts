"use server";

import { auth } from "@/auth";
import {
  createPromoHeaderSchema,
  CreatePromoHeaderType,
} from "./promoHeader.schema";
import { allowedRoles } from "@/config/constant/allowedRoles";
import connectDB from "@/config/db/connect";
import PromoHeader from "./promoHeader.model";
import { revalidatePath, revalidateTag } from "next/cache";
import { PROMO_HEADER_TAG } from "@/config/constant/tags";
import { PROMO_HEADER_ROUTE } from "@/config/constant/routes";

export const createPromoHeader = async (
  data: CreatePromoHeaderType
): Promise<void | { error: string }> => {
  const session = await auth();
  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  const validateFields = createPromoHeaderSchema.safeParse(data);

  if (!validateFields.success) return { error: "Validation Error" };

  const { title, isActive } = validateFields.data;

  try {
    await connectDB();
    await PromoHeader.create({ title, isActive });
    revalidateTag(PROMO_HEADER_TAG);
    revalidatePath(PROMO_HEADER_ROUTE);
  } catch (error) {
    console.log("Error from createPromoHeader", error);
    return { error: "Something went wrong" };
  }
};

export const updatePromoHeader = async (
  data: CreatePromoHeaderType,
  id: string
): Promise<void | { error: string }> => {
  const session = await auth();
  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  const validateFields = createPromoHeaderSchema.safeParse(data);

  if (!validateFields.success) return { error: "Validation Error" };

  const { title, isActive } = validateFields.data;

  try {
    await connectDB();
    await PromoHeader.findByIdAndUpdate(id, { title, isActive });
    revalidateTag(PROMO_HEADER_TAG);
    revalidatePath(PROMO_HEADER_ROUTE);
  } catch (error) {
    console.log("Error from updatePromoHeader", error);
    return { error: "Something went wrong" };
  }
};

export const deletePromoHeader = async (
  id: string
): Promise<void | { error: string }> => {
  const session = await auth();
  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  try {
    await connectDB();
    await PromoHeader.findByIdAndDelete(id);
    revalidateTag(PROMO_HEADER_TAG);
    revalidatePath(PROMO_HEADER_ROUTE);
  } catch (error) {
    console.log("Error from deletePromoHeader", error);
    return { error: "Something went wrong" };
  }
};
