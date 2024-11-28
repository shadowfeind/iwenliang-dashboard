"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMainStore } from "@/config/store/useMainStore";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";

type Props = {};

export const MobileNav = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const isOpen = useMainStore((state) => state.isOpen);
  const onOpen = useMainStore((state) => state.onOpen);
  const onClose = useMainStore((state) => state.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div onClick={onOpen} className="block md:hidden">
        <Menu className="w-4 h-4" />
      </div>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={"left"} className="p-2 pt-10  bg-black text-white">
          <SideNav />
        </SheetContent>
      </Sheet>
    </>
  );
};
