import Header from "@/components/layout/Header";
import SideNav from "@/components/layout/side-nav/SideNav";
import { AuthProvider } from "@/config/providers/AuthProvider";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Iwenliang | Dashboard",
  description: "Admin Panel",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await auth();
  if (!user) redirect("/");
  const serealizedUser = user ? { ...user, id: user?.id.toString() } : null;
  return (
    <AuthProvider session={{ user: serealizedUser }}>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <div className="hidden md:block">
          <SideNav />
        </div>
        <main className="flex-1 overflow-hidden pt-16">{children}</main>
      </div>
    </AuthProvider>
  );
}
