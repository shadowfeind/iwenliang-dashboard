"use server";

import connectDB from "@/config/db/connect";
import Subscriber from "./subscriber.model";
import { auth } from "@/auth";
import { allowedRoles } from "@/config/constant/allowedRoles";

export const createSubscriber = async (
  email: string
): Promise<void | { error: string }> => {
  try {
    await connectDB();
    if (!email) return { error: "Email is required" };

    const alreadySubscribed = await Subscriber.findOne({ email }).lean();
    if (alreadySubscribed) return { error: "Email already subscribed" };

    await Subscriber.create({ email });
  } catch (error) {
    console.log("createSubscriber error: ", error);
    return {
      error: "Error creating subscriber",
    };
  }
};

export const deleteSubscriber = async (
  id: string
): Promise<void | {
  error: string;
}> => {
  const session = await auth();

  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  try {
    await connectDB();
    await Subscriber.findByIdAndDelete(id);
  } catch (error) {
    console.log("deleteSubscriber error: ", error);
    return { error: "Something went wrong" };
  }
};
