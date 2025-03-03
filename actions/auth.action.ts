"use server";

import { AuthType } from "@/config/schemas/auth.schema";
import jwt from "jsonwebtoken";
import { signIn } from "@/auth";
import connectDB from "@/config/db/connect";
import User from "@/features/users/user.model";
import { UserTypes } from "@/features/users/users.types";
import { sendEmail } from "@/lib/sendEmail";
import { signOut as authSignOut } from "@/auth";

export async function login(
  values: AuthType
): Promise<void | { error: string }> {
  try {
    await signIn("credentials", {
      redirect: false,
      ...values,
    });
  } catch (error) {
    return {
      error: "Invalid credentials",
    };
  }
}

export async function forgotPassword(
  email: string
): Promise<void | { error: string }> {
  if (!email) return { error: "Email is required" };

  await connectDB();

  const user = await User.findOne({ email }).lean<UserTypes>();
  if (!user) return { error: "Email not found." };

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "20m",
  });

  const resetLink = `${process.env.NEXT_PUBLIC_URL}forgot-password/${token}/reset-password`;

  const html = `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`;

  sendEmail(email, "Reset your password", html);
}


