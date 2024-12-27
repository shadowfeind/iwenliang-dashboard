import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  styles?: string;
  children: React.ReactNode;
};

const SpacedContainer = ({ styles, children }: Props) => {
  return (
    <div className={cn("w-full p-4 lg:w-10/12 lg:my-24 lg:mx-auto", styles)}>
      {children}
    </div>
  );
};

export default SpacedContainer;
