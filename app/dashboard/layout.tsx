import Header from "@/components/layout/Header";
import SideNav from "@/components/layout/side-nav/SideNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iwenliang | Dashboard",
  description: "Admin Panel",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <div className="hidden md:block">
          <SideNav />
        </div>
        <main className="flex-1 overflow-hidden pt-16">{children}</main>
      </div>
    </>
  );
}
