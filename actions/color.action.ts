import { COLR_ROUTE } from "@/config/constant/routes";
import connectDB from "@/config/db/connect";
import {
  createColorSchema,
  CreateColorSchemaType,
} from "@/config/schemas/color.schema";
import { auth } from "@/lib/auth";
import Color from "@/models/color.model";
import { revalidatePath } from "next/cache";

export async function createColor(
  values: CreateColorSchemaType
): Promise<void | { error: string }> {
  await connectDB();

  const { session, user } = await auth();

  if (!session || user?.role !== "Admin") return { error: "Unauthorized" };

  const validateFields = createColorSchema.safeParse(values);

  if (!validateFields.success) return { error: "Validation error" };

  const { name, hexValue } = validateFields.data;

  try {
    await Color.create({ name, hexValue });
    revalidatePath(COLR_ROUTE);
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
  const { session, user } = await auth();

  if (!session || user?.role !== "Admin") return { error: "Unauthorized" };

  const validateFields = createColorSchema.safeParse(value);

  if (!validateFields.success) return { error: "Validation Error" };

  const { name, hexValue } = validateFields.data;

  const color = await Color.findById(id);

  if (!color) return { error: "Color not found" };

  try {
    color.name = name;
    color.hexValue = hexValue;
    await color.save();
    revalidatePath(COLR_ROUTE);
  } catch (error) {
    console.log("Error from updateColor", error);
    return { error: "Something went wrong" };
  }
}

export async function deleteColor(
  id: string
): Promise<void | { error: string }> {
  await connectDB();

  const { session, user } = await auth();

  if (!session || user?.role !== "Admin") return { error: "Unauthorized" };

  try {
    await Color.findByIdAndDelete(id);
    revalidatePath(COLR_ROUTE);
  } catch (error) {
    console.log("Error from deleteColor", error);
    return { error: "Something went wrong" };
  }
}
