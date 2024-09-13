"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/config/store/useMainStore";
import { SidebarRoutes } from "@/config/types/sidenav.types";
import {
  ChevronLeft,
  LayoutDashboard,
  ShoppingBasket,
  User,
  ChartColumnStacked,
} from "lucide-react";
import { SingleSidenav } from "./SingleSidenav";
import { CATEGORY_ROUTE, PRODUCT_ROUTE } from "@/config/constant/routes";

const routes: SidebarRoutes[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5 ml-2" />,
    link: "/dashboard",
  },
  {
    name: "Category",
    icon: <ChartColumnStacked className="w-5 h-5 ml-2" />,
    link: CATEGORY_ROUTE,
  },
  {
    name: "Product",
    icon: <ShoppingBasket className="w-5 h-5 ml-2" />,
    link: PRODUCT_ROUTE,
  },
  {
    name: "User",
    icon: <User className="w-5 h-5 ml-2" />,
    link: "/dashboard/user",
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
        `relative  h-[calc(100vh-3rem)] md:mt-12 flex-none md:border-r md:block`,
        status && "duration-300",
        !isMinimized ? "w-72" : "w-[64px]"
      )}
    >
      <ChevronLeft
        className={cn(
          "absolute -right-3 top-0 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
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
