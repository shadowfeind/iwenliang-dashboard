"use server";

import connectDB from "@/config/db/connect";
import bcrypt from "bcryptjs";
import {
  createUserSchema,
  CreateUserType,
  updateUserSchema,
  UpdateUserType,
} from "@/config/schemas/user.schema";
import { revalidatePath } from "next/cache";
import { UserTypes } from "@/config/types/users-types";
import User from "@/models/user.model";
import { auth } from "@/lib/auth";

export async function getAllUsers(): Promise<UserTypes[] | { error: string }> {
  await connectDB();
  const users = await User.find().sort({ createdAt: 1 }).lean();
  if (!users) {
    return { error: "Something went wrong" };
  }
  return JSON.parse(JSON.stringify(users));
}

export async function createUser(
  user: CreateUserType
): Promise<void | { error: string }> {
  await connectDB();

  const { session } = await auth();

  if (!session) return { error: "Unauthorized" };

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

    revalidatePath("/dashboard/users");
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

export async function getUserByIdAction(
  id: string
): Promise<UserTypes | { error: string }> {
  await connectDB();

  const { session } = await auth();

  if (!session) return { error: "Unauthorized" };

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

  const { session } = await auth();

  if (!session) return { error: "Unauthorized" };

  const validateFields = updateUserSchema.safeParse(user);

  if (!validateFields.success) return { error: "Failed to update" };

  const { fullName, role } = validateFields.data;

  const userData = await User.findById(userId);

  if (!userData) {
    return { error: "User not found" };
  }

  userData.fullName = fullName;
  userData.role = role;

  await userData.save();

  revalidatePath("/dashboard/users");
}

export async function changePassword(
  password: string,
  id: string
): Promise<void | { error: string }> {
  await connectDB();
  const { session } = await auth();

  if (!session) return { error: "Unauthorized" };

  const user = await User.findById(id);

  if (!user) return { error: "User not found" };

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.save();

  revalidatePath("/dashboard/users");
}

export async function deleteUser(
  id: string
): Promise<void | { error: string }> {
  await connectDB();
  const { session } = await auth();

  if (!session) return { error: "Unauthorized" };
  try {
    await User.findByIdAndDelete(id);
    revalidatePath("/dashboard/users");
  } catch (error) {
    return { error: "Failed to delete" };
  }
}
