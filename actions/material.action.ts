"use server";

import { MATERIAL_ROUTE } from "@/config/constant/routes";
import connectDB from "@/config/db/connect";
import {
  materialSchema,
  MaterialSchemaType,
} from "@/config/schemas/material.schema";
import { auth } from "@/lib/auth";
import Material from "@/models/material.model";
import { revalidatePath } from "next/cache";

export async function createMaterial(
  value: MaterialSchemaType
): Promise<void | { error: string }> {
  await connectDB();
  const { session, user } = await auth();

  console.log(user);
  if (!session || user?.role !== "Admin") return { error: "Unauthorized" };

  const validateFields = materialSchema.safeParse(value);

  if (!validateFields.success) return { error: "Validation Error" };

  const { name } = validateFields.data;

  try {
    await Material.create({ name });
    revalidatePath(MATERIAL_ROUTE);
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
  const { session, user } = await auth();

  if (!session || user?.role !== "Admin") return { error: "Unauthorized" };

  const validateFields = materialSchema.safeParse(value);

  if (!validateFields.success) return { error: "Validation Error" };

  const { name } = validateFields.data;

  const material = await Material.findById(id);

  if (!material) return { error: "Material not found" };

  try {
    material.name = name;
    await material.save();
    revalidatePath(MATERIAL_ROUTE);
  } catch (error) {
    console.log("Error from updateMaterial", error);
    return { error: "Something went wrong" };
  }
}

export async function deleteMaterial(
  id: string
): Promise<void | { error: string }> {
  await connectDB();

  const { session, user } = await auth();

  if (!session || user?.role !== "Admin") return { error: "Unauthorized" };

  try {
    await Material.findByIdAndDelete(id);
    revalidatePath(MATERIAL_ROUTE);
  } catch (error) {
    console.log("Error from deleteMaterial", error);
    return { error: "Something went wrong" };
  }
}
