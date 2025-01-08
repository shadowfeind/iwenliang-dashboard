import { cn } from "@/lib/utils";
import { useMainStore } from "@/config/store/useMainStore";
import { SidebarRoutes } from "@/config/types/sidenav.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  items: SidebarRoutes[];
};

export const SingleSidenav = ({ items }: Props) => {
  const pathname = usePathname();
  const isMinimized = useMainStore((state) => state.isMinimized);

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <Link
            href={item.link}
            className={cn(
              "flex text-white items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-black",
              pathname === item.link ? "bg-accent text-black" : "transparent"
            )}
          >
            {item.icon}

            {!isMinimized ? (
              <span className="mr-2 truncate">{item.name}</span>
            ) : (
              ""
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};
