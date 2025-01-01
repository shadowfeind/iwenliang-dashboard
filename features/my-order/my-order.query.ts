import { auth } from "@/auth";
import { OrderType } from "../orders/order.types";
import connectDB from "@/config/db/connect";
import Order from "../orders/order.model";

export const getOrderByCustomerId = async (
  userId: string
): Promise<OrderType[] | { error: string }> => {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  if (session.user._id?.toString() !== userId?.toString())
    return { error: "Unauthorized" };

  await connectDB();

  const order = await Order.find({ user: userId }).lean<OrderType>();
  return JSON.parse(JSON.stringify(order));
};
