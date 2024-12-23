import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

// next auth provider does not work.
// will rely on server side auth
export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
}
