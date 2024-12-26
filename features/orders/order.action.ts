"use server";

import { auth } from "@/auth";
import { createOrderSchema, CreateOrderSchemaType } from "./order.schema";
import { OrderType } from "./order.types";
import Order from "./order.model";
import connectDB from "@/config/db/connect";

export const createOrder = async (
  values: CreateOrderSchemaType
): Promise<OrderType | { error: string }> => {
  await connectDB();
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const validateFields = createOrderSchema.safeParse(values);

  if (!validateFields.success) return { error: "Validation Error" };

  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    discountPrice,
    discountCode,
    discountPercentage,
    shippingPrice,
    discountType,
    taxPrice,
    totalPrice,
  } = validateFields.data;

  const user = session?.user?._id;
  const status = "Pending";

  try {
    const order = await Order.create({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      discountPrice,
      discountCode,
      discountPercentage,
      shippingPrice,
      discountType,
      taxPrice,
      totalPrice,
      user,
      status,
    });

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log("Error from createOrder", error);
    return { error: "Something went wrong" };
  }
};
