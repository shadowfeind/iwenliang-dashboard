import { auth } from "@/auth";
import Header from "@/components/layout/Header";
import SideNav from "@/components/layout/side-nav/SideNav";

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
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const role = session.user.role;

  return (
    <>
      <Header role={role} />
      <div className="flex h-screen ">
        <div className="hidden md:block">
          <SideNav role={role} />
        </div>
        <main className="flex-1 overflow-x-hidden  overflow-y-auto pt-16">
          {children}
        </main>
      </div>
    </>
  );
}
