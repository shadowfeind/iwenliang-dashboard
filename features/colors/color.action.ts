"use server";

import { COLR_ROUTE } from "@/config/constant/routes";
import connectDB from "@/config/db/connect";
import {
  createColorSchema,
  CreateColorSchemaType,
} from "@/features/colors/color.schema";
import Color from "@/features/colors/color.model";
import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/auth";
import { COLOR_TAG } from "@/config/constant/tags";

export async function createColor(
  values: CreateColorSchemaType
): Promise<void | { error: string }> {
  await connectDB();

  const session = await auth();

  if (!session) return { error: "Unauthorized" };

  const validateFields = createColorSchema.safeParse(values);

  if (!validateFields.success) return { error: "Validation error" };

  const { name, hexValue } = validateFields.data;

  try {
    await Color.create({ name, hexValue });
    revalidateTag(COLOR_TAG);
  } catch (error) {
    console.log("Error from createColor action", error);
    return { error: "Something went wrong" };
  }
}

export async function updateColor(
  value: CreateColorSchemaType,
  id: string
): Promise<void | { error: string }> {
  await connectDB();
  const session = await auth();

  if (!session) return { error: "Unauthorized" };

  const validateFields = createColorSchema.safeParse(value);

  if (!validateFields.success) return { error: "Validation Error" };

  const { name, hexValue } = validateFields.data;

  const color = await Color.findById(id);

  if (!color) return { error: "Color not found" };

  try {
    color.name = name;
    color.hexValue = hexValue;
    await color.save();
    revalidateTag(COLOR_TAG);
  } catch (error) {
    console.log("Error from updateColor", error);
    return { error: "Something went wrong" };
  }
}

export async function deleteColor(
  id: string
): Promise<void | { error: string }> {
  await connectDB();

  const session = await auth();

  if (!session || session.user?.role !== "Admin")
    return { error: "Unauthorized" };

  try {
    await Color.findByIdAndDelete(id);
    revalidateTag(COLOR_TAG);
  } catch (error) {
    console.log("Error from deleteColor", error);
    return { error: "Something went wrong" };
  }
}
