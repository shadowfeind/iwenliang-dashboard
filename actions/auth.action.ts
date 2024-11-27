"use server";

import { AuthType } from "@/config/schemas/auth.schema";
import { auth, lucia } from "@/config/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";

export async function login(
  values: AuthType
): Promise<void | { error: string }> {
  try {
    await signIn("credentials", {
      redirect: false,
      ...values,
    });

    redirect("/dashboard");
  } catch (error) {
    return {
      error: "Invalid credentials",
    };
  }
}

export async function logout(): Promise<void> {
  try {
    const { session } = await auth();
    if (!session) {
      redirect("/");
    }
    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error: any) {
    console.log(error);
  }
}
