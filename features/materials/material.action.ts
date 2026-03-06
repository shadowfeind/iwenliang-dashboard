"use server";

import connectDB from "@/config/db/connect";
import {
  materialSchema,
} from "@/features/materials/material.schema";
import Material from "@/features/materials/material.model";
import { revalidateTag } from "next/cache";
import { MATERIAL_TAG, PRODUCT_FILTER } from "@/config/constant/tags";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";

export const createMaterial = authActionClient
  .schema(materialSchema)
  .action(async ({ parsedInput }) => {
    await connectDB();

    const { name } = parsedInput;

    await Material.create({ name });
    revalidateTag(MATERIAL_TAG);
    revalidateTag(PRODUCT_FILTER);
    return { success: true };
  });

export const updateMaterial = authActionClient
  .schema(materialSchema.extend({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    await connectDB();

    const { name, id } = parsedInput;

    const material = await Material.findById(id);

    if (!material) return { error: "Material not found" };

    material.name = name;
    await material.save();
    revalidateTag(MATERIAL_TAG);
    revalidateTag(PRODUCT_FILTER);
    return { success: true };
  });

export const deleteMaterial = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    await connectDB();

    await Material.findByIdAndDelete(id);
    revalidateTag(MATERIAL_TAG);
    revalidateTag(PRODUCT_FILTER);
    return { success: true };
  });
