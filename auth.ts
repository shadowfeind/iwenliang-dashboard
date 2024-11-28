import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authSchema } from "./config/schemas/auth.schema";
import bcrypt from "bcryptjs";
import { getUserByUsername } from "./features/users/user.query";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userName: string;
      fullName: string;
      role: string;
      email: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user._id = token.sub;
        session.user.userName = token.userName as string;
        session.user.fullName = token.fullName as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user._id;
        token.userName = user.userName;
        token.fullName = user.fullName;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = authSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { userName, password } = validatedFields.data;

          const user = await getUserByUsername(userName);

          if (!user) throw new Error("User not found");

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) throw new Error("Credential error");

          return {
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            role: user.role,
          };
        }
        throw new Error("Validation error");
      },
    }),
  ],
});
