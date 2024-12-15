import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  style?: string;
};

const Container = ({ children, style }: Props) => {
  return (
    <div className={cn("w-full md:w-10/12 mx-auto", style)}>{children}</div>
  );
};

export default Container;
