import connectDB from "@/config/db/connect";
import User from "./user.model";
import { UserTypes } from "./users.types";

export async function getAllUsers(): Promise<UserTypes[] | { error: string }> {
  try {
    await connectDB();
    const users = await User.find().sort({ createdAt: -1 }).lean<UserTypes[]>();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "Failed to retrieve users" };
  }
}

export async function getUserByUsername(
  userName: string
): Promise<UserTypes | null> {
  await connectDB();
  const user = await User.findOne({ userName }).lean<UserTypes>();
  return user;
}
