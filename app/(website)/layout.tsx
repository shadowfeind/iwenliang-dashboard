"use client";

import Header from "@/components/website/Header";
import { PRIVATE_ROUTES } from "@/config/constant/routes";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showHeader = PRIVATE_ROUTES.includes(pathname);
  return (
    <>
      {!showHeader && <Header />}
      <main>{children}</main>
    </>
  );
}
