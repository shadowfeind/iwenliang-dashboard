import connectDB from "@/config/db/connect";
import Order from "./order.model";
import { OrderType } from "./order.types";
import { serializeDocument } from "@/lib/utils";

export const getAllOrdersQuery = async (): Promise<
  OrderType[] | { error: string }
> => {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).lean<OrderType[]>();
  if (!orders) {
    return { error: "No orders found" };
  }
  return serializeDocument(orders);
};

export const getOrderByIdQuery = async (
  id: string
): Promise<OrderType | { error: string }> => {
  await connectDB();
  const order = await Order.findById(id)
    .populate("user", "-password")
    .lean<OrderType>();
  if (!order) {
    return { error: "No order found" };
  }
  return serializeDocument(order);
};
