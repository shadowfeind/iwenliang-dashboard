"use server";

import connectDB from "@/config/db/connect";
import {
  materialSchema,
  MaterialSchemaType,
} from "@/features/materials/material.schema";
import Material from "@/features/materials/material.model";
import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/auth";
import { MATERIAL_TAG, PRODUCT_FILTER } from "@/config/constant/tags";
import { allowedRoles } from "@/config/constant/allowedRoles";

export async function createMaterial(
  value: MaterialSchemaType
): Promise<void | { error: string }> {
  await connectDB();
  const session = await auth();

  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  const validateFields = materialSchema.safeParse(value);

  if (!validateFields.success) return { error: "Validation Error" };

  const { name } = validateFields.data;

  try {
    await Material.create({ name });
    revalidateTag(MATERIAL_TAG);
    revalidateTag(PRODUCT_FILTER);
  } catch (error) {
    console.log("Error from createMaterial", error);
    return { error: "Something went wrong" };
  }
}

export async function updateMaterial(
  value: MaterialSchemaType,
  id: string
): Promise<void | { error: string }> {
  await connectDB();
  const session = await auth();

  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  const validateFields = materialSchema.safeParse(value);

  if (!validateFields.success) return { error: "Validation Error" };

  const { name } = validateFields.data;

  const material = await Material.findById(id);

  if (!material) return { error: "Material not found" };

  try {
    material.name = name;
    await material.save();
    revalidateTag(MATERIAL_TAG);
    revalidateTag(PRODUCT_FILTER);
  } catch (error) {
    console.log("Error from updateMaterial", error);
    return { error: "Something went wrong" };
  }
}

export async function deleteMaterial(
  id: string
): Promise<void | { error: string }> {
  await connectDB();

  const session = await auth();
  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  try {
    await Material.findByIdAndDelete(id);
    revalidateTag(MATERIAL_TAG);
    revalidateTag(PRODUCT_FILTER);
  } catch (error) {
    console.log("Error from deleteMaterial", error);
    return { error: "Something went wrong" };
  }
}
