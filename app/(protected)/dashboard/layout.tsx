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
    <div className="min-h-screen">
      <Header role={role} />
      <div className="flex pt-12">
        <div className="hidden md:block fixed top-0 left-0">
          <SideNav role={role} />
        </div>
        <main className="flex-1 ml-0 md:ml-[288px] pt-16">{children}</main>
      </div>
    </div>
  );
}
