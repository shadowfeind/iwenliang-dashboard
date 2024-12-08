import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title: string;
  styles?: string;
  width?: string;
};

const TitleHeader = ({ title, styles, width = "w-32" }: Props) => {
  return (
    <>
      <h2
        className={cn(
          "text-sm font-semibold uppercase tracking-wide pb-1",
          styles
        )}
      >
        {title}
      </h2>
      <span className={cn("block h-[2px]  bg-black", width)}></span>
    </>
  );
};

export default TitleHeader;
