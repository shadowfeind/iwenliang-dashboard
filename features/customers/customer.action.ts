"use server";

import connectDB from "@/config/db/connect";
import User from "../users/user.model";
import bcrypt from "bcryptjs";
import { customerSchema, CustomerTypes } from "./customer.schema";

export async function registerCustomer(
  values: CustomerTypes
): Promise<{ success: boolean; error: string }> {
  await connectDB();

  const validateFields = customerSchema.safeParse(values);
  if (!validateFields.success)
    return { success: false, error: "Invalid Fields" };

  const { userName, fullName, email, password } = validateFields.data;
  const userNameExists = await User.findOne({ userName }).lean();

  if (userNameExists)
    return { success: false, error: "UserName already exists" };

  const userEmailExists = await User.findOne({ email }).lean();

  if (userEmailExists) return { success: false, error: "email already exists" };

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      fullName,
      userName,
      email,
      password: hashedPassword,
      role: "Customer",
    });
    return { success: true, error: "" };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
