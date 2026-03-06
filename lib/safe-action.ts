import { createSafeActionClient } from "next-safe-action";
import { auth } from "@/auth";
import { allowedRoles } from "@/config/constant/allowedRoles";

export const actionClient = createSafeActionClient({
  handleServerError(e: Error) {
    if (e instanceof Error) {
      return e.message;
    }
    return "Something went wrong";
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();

  if (!session || !allowedRoles.includes(session?.user?.role as string)) {
    throw new Error("Unauthorized");
  }

  return next({ ctx: { session } });
});