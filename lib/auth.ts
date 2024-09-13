import { Lucia, TimeSpan } from "lucia";
import { adapter } from "./adapter";
import { cache } from "react";
import { cookies } from "next/headers";

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(7, "d"),
  sessionCookie: {
    name: "auth",
    attributes: {
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
  },
  getUserAttributes: (attributes: any) => {
    return {
      fullName: attributes.fullName,
      userName: attributes.userName,
      email: attributes.email,
      role: attributes.role,
      id: attributes.id,
    };
  },
});

export const auth = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) return { user: null, session: null };

  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {}

  return { user, session };
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  role: "User" | "Admin" | "Customer";
}
