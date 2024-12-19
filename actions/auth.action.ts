"use server";

import { AuthType } from "@/config/schemas/auth.schema";

import { signIn } from "@/auth";

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
