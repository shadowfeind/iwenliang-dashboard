"use client";

import HeaderProfile from "@/components/layout/HeaderProfile";
import { Cart } from "../cart/Cart";
import { useEffect, useState } from "react";

const DesktopRightMenu = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="flex items-center gap-4">
      {mounted && <Cart />}
      <HeaderProfile />
    </div>
  );
};

export default DesktopRightMenu;
