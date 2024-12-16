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
  BrickWall,
  Palette,
  Image as CarouselImage,
  Link,
} from "lucide-react";
import { SingleSidenav } from "./SingleSidenav";
import {
  BEAD_SIZE_ROUTE,
  CAROUSEL_ROUTE,
  CATEGORY_ROUTE,
  COLR_ROUTE,
  MATERIAL_ROUTE,
  PRODUCT_ROUTE,
  USER_ROUTE,
} from "@/config/constant/routes";

const routes: SidebarRoutes[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5 ml-2" />,
    link: "/dashboard",
  },
  {
    name: "User",
    icon: <User className="w-5 h-5 ml-2" />,
    link: USER_ROUTE,
  },
  {
    name: "Product",
    icon: <ShoppingBasket className="w-5 h-5 ml-2" />,
    link: PRODUCT_ROUTE,
  },
  {
    name: "Category",
    icon: <ChartColumnStacked className="w-5 h-5 ml-2" />,
    link: CATEGORY_ROUTE,
  },
  {
    name: "Carousel",
    icon: <CarouselImage className="w-5 h-5 ml-2" />,
    link: CAROUSEL_ROUTE,
  },
  {
    name: "Stone",
    icon: <BrickWall className="w-5 h-5 ml-2" />,
    link: MATERIAL_ROUTE,
  },
  {
    name: "Color",
    icon: <Palette className="w-5 h-5 ml-2" />,
    link: COLR_ROUTE,
  },
  {
    name: "Bead Size",
    icon: <Link className="w-5 h-5 ml-2" />,
    link: BEAD_SIZE_ROUTE,
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
        `relative bg-black  h-[calc(100vh-3rem)] md:mt-12 flex-none md:border-r md:block`,
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
