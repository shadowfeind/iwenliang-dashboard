"use server";

import connectDB from "@/config/db/connect";
import {
  createBeadSizeSchema,
} from "./beadSize.schema";
import BeadSize from "./beadSize.model";
import { BEAS_SIZE_TAG, PRODUCT_FILTER } from "@/config/constant/tags";
import { revalidateTag } from "next/cache";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";

export const createBeadSize = authActionClient
  .schema(createBeadSizeSchema)
  .action(async ({ parsedInput }) => {
    await connectDB();

    const { name } = parsedInput;

    await BeadSize.create({ name });
    revalidateTag(BEAS_SIZE_TAG);
    revalidateTag(PRODUCT_FILTER);
    return { success: true };
  });

export const deleteBeadSize = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    await connectDB();

    await BeadSize.findByIdAndDelete(id);
    revalidateTag(BEAS_SIZE_TAG);
    revalidateTag(PRODUCT_FILTER);
    return { success: true };
  });

export const updateBeadSize = authActionClient
  .schema(createBeadSizeSchema.extend({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    await connectDB();

    const { name, id } = parsedInput;

    const beadSize = await BeadSize.findById(id);

    if (!beadSize) return { error: "BeadSize not found" };

    beadSize.name = name;
    await beadSize.save();
    revalidateTag(BEAS_SIZE_TAG);
    revalidateTag(PRODUCT_FILTER);
    return { success: true };
  });
