"use client";

import { useMainStore } from "@/config/store/useMainStore";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

const Main = ({ children }: Props) => {
  const isMinimized = useMainStore((state) => state.isMinimized);
  return (
    <main
      className={cn(
        "flex-1 ml-0 duration-300 pt-16",
        isMinimized ? "md:ml-[64px]" : "md:ml-[288px]"
      )}
    >
      {children}
    </main>
  );
};

export default Main;
