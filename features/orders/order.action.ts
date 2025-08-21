"use server";

import { auth } from "@/auth";
import { createOrderSchema, CreateOrderSchemaType } from "./order.schema";
import { OrderType } from "./order.types";
import Order, { OrderStatus } from "./order.model";
import connectDB from "@/config/db/connect";
import { serializeDocument } from "@/lib/utils";

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
    coupon,
    globalDiscount,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = validateFields.data;

  const user = session?.user?._id;
  const status = OrderStatus.Pending;

  try {
    const order = await Order.create({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      coupon,
      globalDiscount,
      shippingPrice,
      taxPrice,
      totalPrice,
      user,
      status,
    });

    return serializeDocument(order);
  } catch (error) {
    console.log("Error from createOrder", error);
    return { error: "Something went wrong" };
  }
};
