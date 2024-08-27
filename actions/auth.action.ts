"use server";

import { authSchema, AuthType } from "@/config/schemas/auth.schema";
import { lucia } from "@/lib/auth";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function singIn(
  values: AuthType
): Promise<void | { error: string }> {
  const validateFields = authSchema.safeParse(values);

  if (!validateFields.success) return { error: "validation error" };

  const { userName, password } = validateFields.data;

  const user = await User.findOne({ userName });

  if (!user) return { error: "User does not exists" };

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) return { error: "Credential error" };

  const session = await lucia.createSession(user._id, {});

  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect("/dashboard");
}
