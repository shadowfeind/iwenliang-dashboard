"use server";

import { auth } from "@/auth";
import {
  createShippingPriceSchema,
  createShippingPriceSchemaType,
} from "./shippingPrice.schema";
import { allowedRoles } from "@/config/constant/allowedRoles";
import ShippingPrice from "./shippingPriceModel";
import connectDB from "@/config/db/connect";
import { SHIPPING_PRICE_TAG } from "@/config/constant/tags";
import { revalidateTag } from "next/cache";

// export async function createMultipleShippingPrice(
//   datas: createShippingPriceSchemaType[]
// ): Promise<void | { error: string }> {
//   try {
//     await connectDB();
//     await ShippingPrice.insertMany(datas);
//   } catch (error) {
//     console.log("Error from createMultipleShippingPrice", error);
//     return { error: "Validation Error" };
//   }
// }

export async function updateShippingPrice(
  value: createShippingPriceSchemaType,
  id: string
): Promise<void | { error: string }> {
  await connectDB();
  const session = await auth();

  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  const validateFields = createShippingPriceSchema.safeParse(value);

  if (!validateFields.success) return { error: "Validation Error" };

  const { price } = validateFields.data;

  try {
    await ShippingPrice.findByIdAndUpdate(id, { price });
    revalidateTag(SHIPPING_PRICE_TAG);
  } catch (error) {
    console.log("Error from updateShippingPrice", error);
    return { error: "Something went wrong" };
  }
}
