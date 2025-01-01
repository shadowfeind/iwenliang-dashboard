"use server";

import connectDB from "@/config/db/connect";
import bcrypt from "bcryptjs";
import {
  createUserSchema,
  CreateUserType,
  updateUserSchema,
  UpdateUserType,
} from "@/features/users/user.schema";
import { revalidatePath, revalidateTag } from "next/cache";
import { UserTypes } from "@/features/users/users.types";
import User from "@/features/users/user.model";

import { CUSTOMER_ORDER_ROUTE, USER_ROUTE } from "@/config/constant/routes";
import { auth } from "@/auth";
import { USER_TAG } from "@/config/constant/tags";
import { allowedRoles } from "@/config/constant/allowedRoles";

export async function createUser(
  user: CreateUserType
): Promise<void | { error: string }> {
  await connectDB();

  const session = await auth();

  if (!session || session.user?.role !== "Admin")
    return { error: "Unauthorized" };

  const validateFields = createUserSchema.safeParse(user);

  if (!validateFields.success) return { error: "Invalid Fields" };

  const { userName, fullName, email, password, role } = validateFields.data;

  const userEmailExists = await User.findOne({ email }).lean();

  if (userEmailExists) return { error: "email already exists" };

  const userNameExists = await User.findOne({ userName }).lean();

  if (userNameExists) return { error: "UserName already exists" };

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      fullName,
      userName,
      email,
      password: hashedPassword,
      role,
    });

    revalidateTag(USER_TAG);
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

export async function getUserByIdAction(
  id: string
): Promise<UserTypes | { error: string }> {
  await connectDB();

  const session = await auth();

  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  const user = await User.findById(id).exec();

  if (!user) {
    return { error: "User not found" };
  }

  return JSON.parse(JSON.stringify(user));
}

export async function updateUser(
  user: UpdateUserType,
  userId: string
): Promise<void | { error: string }> {
  await connectDB();

  const session = await auth();

  if (!session) return { error: "Unauthorized" };

  const validateFields = updateUserSchema.safeParse(user);

  if (!validateFields.success) return { error: "Failed to update" };

  const { fullName, role } = validateFields.data;

  const userData = await User.findById(userId);

  if (!userData) {
    return { error: "User not found" };
  }

  if (
    session.user.role === "Customer" &&
    userData._id.toString() !== session.user._id
  ) {
    return { error: "Unauthorized" };
  }

  userData.fullName = fullName;
  userData.role = role;

  await userData.save();

  revalidateTag(USER_TAG);
  revalidatePath(CUSTOMER_ORDER_ROUTE);
}

export async function changePassword(
  password: string,
  id: string
): Promise<void | { error: string }> {
  await connectDB();
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const user = await User.findById(id);

  if (!user) return { error: "User not found" };

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  await user.save();
}

export async function deleteUser(
  id: string
): Promise<void | { error: string }> {
  await connectDB();
  const session = await auth();

  if (!session || session.user?.role !== "Admin")
    return { error: "Unauthorized" };
  try {
    await User.findByIdAndDelete(id);
    revalidateTag(USER_TAG);
  } catch (error) {
    return { error: "Failed to delete" };
  }
}
