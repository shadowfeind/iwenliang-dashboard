import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authSchema } from "./config/schemas/auth.schema";
import bcrypt from "bcryptjs";
import { getUserByUsername } from "./features/users/user.query";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/sign-in",
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

          return user;
        }
        throw new Error("Validation error");
      },
    }),
  ],
});
