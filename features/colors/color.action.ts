"use server";

import connectDB from "@/config/db/connect";
import {
  createColorSchema,
} from "@/features/colors/color.schema";
import Color from "@/features/colors/color.model";
import { revalidateTag } from "next/cache";
import { COLOR_TAG, PRODUCT_FILTER } from "@/config/constant/tags";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";

export const createColor = authActionClient
  .schema(createColorSchema)
  .action(async ({ parsedInput }) => {
    await connectDB();

    const { name, hexValue } = parsedInput;

    await Color.create({ name, hexValue });
    revalidateTag(COLOR_TAG);
    revalidateTag(PRODUCT_FILTER);
    return { success: true };
  });

export const updateColor = authActionClient
  .schema(createColorSchema.extend({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    await connectDB();

    const { name, hexValue, id } = parsedInput;

    const color = await Color.findById(id);

    if (!color) return { error: "Color not found" };

    color.name = name;
    color.hexValue = hexValue;
    await color.save();
    revalidateTag(COLOR_TAG);
    revalidateTag(PRODUCT_FILTER);
    return { success: true };
  });

export const deleteColor = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    await connectDB();

    await Color.findByIdAndDelete(id);
    revalidateTag(COLOR_TAG);
    revalidateTag(PRODUCT_FILTER);
    return { success: true };
  });
