"use server";

import connectDB from "@/db/connect";
import bcrypt from "bcryptjs";
import {
  getUserByEmail,
  getUserById,
  getUserByUserName,
} from "@/queries/userQueries";
import { CreateUserType } from "@/schemas/userSchemas";
import User from "@/models/userModels";
import { revalidatePath } from "next/cache";
import { UserTypes } from "@/types/users-types";

export async function createUser(
  user: CreateUserType
): Promise<void | { error: string }> {
  await connectDB();
  // only validate data will come here
  const { fullName, userName, email, password, role } = user;

  const userEmailExists = await getUserByEmail(email);

  if (userEmailExists) return { error: "email already exists" };

  const userNameExists = await getUserByUserName(userName);

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

export async function getUserByIdAction(id: string): Promise<UserTypes | null> {
  await connectDB();

  const user = await getUserById(id);

  if (!user) {
    return null;
  }
  // Convert the `_id` to a string and return the user object
  return {
    ...user,
    _id: user._id.toString(),
  };
}
