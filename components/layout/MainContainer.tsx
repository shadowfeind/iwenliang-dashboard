import React from "react";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  children: React.ReactNode;
  scrollable?: boolean;
};

const MainContainer = ({ children }: Props) => {
  return (
    <div className="h-full w-full mb-8 p-4 md:px-8 space-y-4">{children}</div>
  );
};

export default MainContainer;
