"use client";

import { Cart } from "../cart/Cart";
import { useEffect, useState } from "react";

const DesktopRightMenu = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="flex items-center gap-4">
      {mounted && <Cart />}
      {children}
    </div>
  );
};

export default DesktopRightMenu;
