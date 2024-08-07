"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/store/useMainStore";
import { SidebarRoutes } from "@/types/sidenav-types";
import {
  ChevronLeft,
  LayoutDashboard,
  ShoppingBasket,
  User,
} from "lucide-react";
import { SingleSidenav } from "./SingleSidenav";

const routes: SidebarRoutes[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5 ml-2" />,
    link: "/dashboard",
  },
  {
    name: "Product",
    icon: <ShoppingBasket className="w-5 h-5 ml-2" />,
    link: "/dashboard/products",
  },
  {
    name: "Users",
    icon: <User className="w-5 h-5 ml-2" />,
    link: "/dashboard/users",
  },
];

const SideNav = () => {
  const [status, setStatus] = useState(false);
  const toggle = useMainStore((state) => state.toggle);
  const isMinimized = useMainStore((state) => state.isMinimized);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 300);
  };

  return (
    <nav
      className={cn(
        `relative  h-[calc(100vh-3rem)] md:mt-12 flex-none md:border-r  md:block`,
        status && "duration-300",
        !isMinimized ? "w-60" : "w-[60px]"
      )}
    >
      <ChevronLeft
        className={cn(
          "absolute -right-3 top-12 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          "hidden md:block",
          isMinimized && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <SingleSidenav items={routes} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
