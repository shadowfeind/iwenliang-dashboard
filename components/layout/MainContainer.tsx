import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  style?: string;
};

const MainContainer = ({ children, style }: Props) => {
  return (
    <div
      className={cn(
        "h-full w-full mb-8 p-4 overflow-auto md:px-8 space-y-4",
        style
      )}
    >
      {children}
    </div>
  );
};

export default MainContainer;
