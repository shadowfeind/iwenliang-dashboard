"use server";

import { auth } from "@/auth";
import { createShippingSchema, CreateShippingType } from "./shipping.schema";
import { allowedRoles } from "@/config/constant/allowedRoles";
import connectDB from "@/config/db/connect";
import Shipping from "./shipping.model";
import { revalidatePath, revalidateTag } from "next/cache";
import { SHIPPING_TAG } from "@/config/constant/tags";
import { SHIPPING_ROUTE } from "@/config/constant/routes";
import Order, { OrderStatus } from "../orders/order.model";

export const createShipping = async (
  data: CreateShippingType
): Promise<void | { error: string }> => {
  try {
    const session = await auth();

    if (!session || !allowedRoles.includes(session?.user.role))
      return { error: "Unauthorized" };

    const validateFields = createShippingSchema.safeParse(data);
    if (!validateFields.success) return { error: "Validation Error" };
    const {
      orderId,
      customerId,
      dispatchedTo,
      dispatchedBy,
      trackingNo,
      link,
      dispatchedDate,
      arrivalDate,
      remarks,
    } = validateFields.data;

    await connectDB();

    const success = await Shipping.create({
      orderId,
      customerId,
      dispatchedTo,
      dispatchedBy,
      trackingNo,
      link,
      dispatchedDate,
      arrivalDate,
      remarks,
    });

    if (success) {
      await Order.findByIdAndUpdate(orderId, {
        status: OrderStatus.Shipped,
      });
    }

    revalidateTag(SHIPPING_TAG);
    revalidatePath(SHIPPING_ROUTE);
  } catch (error) {
    console.log("Error from createShipping", error);
    return { error: "Something went wrong" };
  }
};

export const updateShipping = async (
  id: string,
  data: CreateShippingType
): Promise<void | { error: string }> => {
  try {
    const session = await auth();

    if (!session || !allowedRoles.includes(session?.user.role))
      return { error: "Unauthorized" };

    const validateFields = createShippingSchema.safeParse(data);
    if (!validateFields.success) return { error: "Validation Error" };
    const {
      dispatchedTo,
      dispatchedBy,
      trackingNo,
      link,
      dispatchedDate,
      arrivalDate,
      remarks,
    } = validateFields.data;

    await connectDB();
    await Shipping.findByIdAndUpdate(id, {
      dispatchedTo,
      dispatchedBy,
      trackingNo,
      link,
      dispatchedDate,
      arrivalDate,
      remarks,
    });
    revalidateTag(SHIPPING_TAG);
    revalidatePath(SHIPPING_ROUTE);
  } catch (error) {
    console.log("Error from updateShipping", error);
    return { error: "Something went wrong" };
  }
};

export const deleteShipping = async (
  id: string
): Promise<void | { error: string }> => {
  try {
    const session = await auth();

    if (!session || !allowedRoles.includes(session?.user.role))
      return { error: "Unauthorized" };
    await connectDB();
    await Shipping.findByIdAndDelete(id);
    revalidateTag(SHIPPING_TAG);
    revalidatePath(SHIPPING_ROUTE);
  } catch (error) {
    console.log("Error from deleteShipping", error);
    return { error: "Something went wrong" };
  }
};
