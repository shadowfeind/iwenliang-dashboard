import { auth } from "@/auth";
import { UserTypes } from "../users/users.types";
import connectDB from "@/config/db/connect";
import User from "../users/user.model";
import { serializeDocument } from "@/lib/utils";

export const getMyProfile = async (): Promise<
  UserTypes | { error: string }
> => {
  const session = await auth();

  if (!session) return { error: "Unauthorized" };

  await connectDB();

  const profile = await User.findById(session.user._id).lean<UserTypes>();

  if (!profile) return { error: " Not found" };

  if (session.user.role === "Customer") {
    if (session.user._id?.toString() !== profile._id?.toString())
      return { error: "Unauthorized" };
  }

  return serializeDocument(profile);
};
