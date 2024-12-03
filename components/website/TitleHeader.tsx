import { cn } from "@/config/lib/utils";
import React from "react";

type Props = {
  title: string;
  styles?: string;
  width?: string;
};

const TitleHeader = ({ title, styles, width = "w-32" }: Props) => {
  return (
    <>
      <h2 className={cn("text-2xl uppercase", styles)}>{title}</h2>
      <span className={cn("block h-0.5 bg-black", width)}></span>
    </>
  );
};

export default TitleHeader;
