import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    email: string;
    role: string;
    userName: string;
    fullName: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
    expires: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    email: string;
    role: string;
    userName: string;
    fullName: string;
  }
}
