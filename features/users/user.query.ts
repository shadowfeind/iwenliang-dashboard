import connectDB from "@/config/db/connect";
import User from "./user.model";
import { UserTypes } from "./users.types";
import { unstable_cache as cache } from "next/cache";
import { USER_TAG } from "@/config/constant/tags";
import { serializeDocument } from "@/lib/utils";

export const getAllUsers = cache(
  async (): Promise<UserTypes[] | { error: string }> => {
    try {
      await connectDB();
      const users = await User.find({ role: { $ne: "Customer" } })
        .select("-password")
        .sort({ createdAt: -1 })
        .lean<UserTypes[]>();
      return serializeDocument(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return { error: "Failed to retrieve users" };
    }
  },
  [USER_TAG],
  {
    tags: [USER_TAG],
    revalidate: false,
  }
);

export async function getUserByUsername(
  userName: string
): Promise<UserTypes | null> {
  await connectDB();
  const user = await User.findOne({ userName }).lean<UserTypes>();
  return serializeDocument(user);
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<UserTypes | null> {
  // TODO: make it post request
  const url = `${process.env.NEXT_PUBLIC_REST_URL}user`;
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!response.ok) {
    return null;
  }
  const { data } = await response.json();

  return data;
}
