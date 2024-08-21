"use server";

import connectDB from "@/db/connect";
import { CreateUserType } from "@/schemas/userSchemas";

export async function createUser(user: CreateUserType) {
  await connectDB();
  // only validate data will come here
  const { fullName, userName, email, password, role } = user;
}
