import User from "@/models/userModels";
import { UserTypes } from "@/types/users-types";

export async function getAllUsers() {
  try {
    const user = await User.find().sort({ createdAt: 1 }).lean();
    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserById(id: string): Promise<UserTypes | null> {
  try {
    const user = (await User.findById(id).lean()) as UserTypes;
    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await User.findOne({ email }).lean();
    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserByUserName(userName: string) {
  try {
    const user = await User.findOne({ userName }).lean();
    return user;
  } catch (error) {
    return null;
  }
}
