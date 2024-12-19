"use server";

import connectDB from "@/config/db/connect";
import {
  createBeadSizeSchema,
  CreateBeadSizeSchemaType,
} from "./beadSize.schema";
import { auth } from "@/auth";
import BeadSize from "./beadSize.model";
import { BEAS_SIZE_TAG, PRODUCT_FILTER } from "@/config/constant/tags";
import { revalidateTag } from "next/cache";
import { allowedRoles } from "@/config/constant/allowedRoles";

export async function createBeadSize(
  values: CreateBeadSizeSchemaType
): Promise<void | { error: string }> {
  await connectDB();

  const session = await auth();

  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  const validateFields = createBeadSizeSchema.safeParse(values);

  if (!validateFields.success) return { error: "Validation error" };

  const { name } = validateFields.data;

  try {
    await BeadSize.create({ name });
    revalidateTag(BEAS_SIZE_TAG);
    revalidateTag(PRODUCT_FILTER);
  } catch (error) {
    console.log("Error from createBeadSize action", error);
    return { error: "Something went wrong" };
  }
}

export async function deleteBeadSize(
  id: string
): Promise<void | { error: string }> {
  await connectDB();

  const session = await auth();

  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  try {
    await BeadSize.findByIdAndDelete(id);
    revalidateTag(BEAS_SIZE_TAG);
    revalidateTag(PRODUCT_FILTER);
  } catch (error) {
    console.log("Error from deleteBeadSize", error);
    return { error: "Something went wrong" };
  }
}

export async function updateBeadSize(
  value: CreateBeadSizeSchemaType,
  id: string
): Promise<void | { error: string }> {
  await connectDB();
  const session = await auth();

  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  const validateFields = createBeadSizeSchema.safeParse(value);

  if (!validateFields.success) return { error: "Validation Error" };

  const { name } = validateFields.data;

  const beadSize = await BeadSize.findById(id);

  if (!beadSize) return { error: "BeadSize not found" };

  try {
    beadSize.name = name;
    await beadSize.save();
    revalidateTag(BEAS_SIZE_TAG);
    revalidateTag(PRODUCT_FILTER);
  } catch (error) {
    console.log("Error from updateBeadSize", error);
    return { error: "Something went wrong" };
  }
}
