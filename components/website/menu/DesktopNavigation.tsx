"use client";

import { MENU_ITEMS } from "@/config/db/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopNavigation = () => {
  const pathname = usePathname();
  return (
    <div className="flex justify-center gap-10">
      {MENU_ITEMS.map((item) => {
        const active = pathname === item.path;
        return (
          <div
            key={item.title}
            className={cn(
              "uppercase text-sm font-semibold",
              active && "underline"
            )}
          >
            <Link href={item.path}>{item.title}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default DesktopNavigation;
