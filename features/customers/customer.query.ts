import connectDB from "@/config/db/connect";
import User from "../users/user.model";
import { CustomerTypes } from "./customer.type";

export const getAllCustomersQuery = async (): Promise<
  CustomerTypes[] | { error: string }
> => {
  await connectDB();
  const customers = await User.find({ role: "Customer" })
    .select("-password")
    .lean()
    .sort({ createdAt: -1 });
  if (!customers) {
    return { error: "No customers found" };
  }
  return JSON.parse(JSON.stringify(customers));
};
