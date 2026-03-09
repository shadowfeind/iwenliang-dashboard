"use client";

import { MENU_ITEMS } from "@/config/constant/menu";
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
              "uppercase text-[13px] tracking-widest font-medium transition-all duration-300 relative group",
              active ? "text-black" : "text-gray-500 hover:text-black",
            )}
          >
            <Link href={item.path} className="pb-1 block">
              {item.title}
              <span
                className={cn(
                  "absolute left-0 bottom-0 w-full h-[2px] bg-[#D4AF37] transition-transform duration-300 origin-left",
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default DesktopNavigation;
