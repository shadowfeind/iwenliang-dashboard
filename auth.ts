import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authSchema } from "./config/schemas/auth.schema";
import bcrypt from "bcryptjs";
import { getUserByUsername } from "./features/users/user.query";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = authSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { userName, password } = validatedFields.data;

          const user = await getUserByUsername(userName);

          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) return null;

          return user;
        }
        return null;
      },
    }),
  ],
});
