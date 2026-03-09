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
          "text-xl md:text-2xl font-serif uppercase tracking-[0.15em] pb-2 text-gray-900",
          styles,
        )}
      >
        {title}
      </h2>
      <span className={cn("block h-[2px] bg-[#D4AF37]", width)}></span>
    </>
  );
};

export default TitleHeader;
