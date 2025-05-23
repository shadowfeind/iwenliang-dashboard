import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  style?: string;
};

const MainContainer = ({ children, style }: Props) => {
  return (
    <div className={cn("h-full w-full p-4 md:px-8 space-y-4", style)}>
      {children}
    </div>
  );
};

export default MainContainer;
