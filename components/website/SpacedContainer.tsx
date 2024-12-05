import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  styles?: string;
  children: React.ReactNode;
};

const SpacedContainer = ({ styles, children }: Props) => {
  return <div className={cn("m-6 lg:m-14", styles)}>{children}</div>;
};

export default SpacedContainer;
