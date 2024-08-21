import User from "@/models/userModels";

export async function getAllUsers() {
  try {
    const user = await User.find().sort({ createdAt: 1 }).lean();
    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await User.findById(id).lean();
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
