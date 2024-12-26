import connectDB from "@/config/db/connect";
import Order from "./order.model";
import { OrderType } from "./order.types";

export const getAllOrdersQuery = async (): Promise<
  OrderType[] | { error: string }
> => {
  await connectDB();
  const orders = await Order.find().lean<OrderType[]>();
  if (!orders) {
    return { error: "No orders found" };
  }
  return JSON.parse(JSON.stringify(orders));
};

export const getOrderByIdQuery = async (
  id: string
): Promise<OrderType | { error: string }> => {
  await connectDB();
  const order = await Order.findById(id).populate("user").lean<OrderType>();
  if (!order) {
    return { error: "No order found" };
  }
  return JSON.parse(JSON.stringify(order));
};
