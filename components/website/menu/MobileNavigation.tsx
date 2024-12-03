"use client";

import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MENU_ITEMS } from "@/config/db/constant";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/config/lib/utils";

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant={"secondary"} className="lg:hidden">
          <MenuIcon className="size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <SheetTitle className="text-center font-bold my-3">
          IWENLIANG
        </SheetTitle>
        <Separator className="mb-4" />
        {MENU_ITEMS.map((item) => {
          const active = pathname === item.path;
          return (
            <div
              key={item.title}
              className={cn("py-2 px-6 uppercase ", active && "bg-accent")}
            >
              <Link href={item.path}>{item.title}</Link>
            </div>
          );
        })}
      </SheetContent>
    </Sheet>
  );
};
