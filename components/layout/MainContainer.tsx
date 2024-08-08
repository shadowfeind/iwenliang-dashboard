import React from "react";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  children: React.ReactNode;
  scrollable?: boolean;
};

const MainContainer = ({ children, scrollable = false }: Props) => {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)]">
          <div className="h-full  p-4 md:px-8 space-y-4">{children}</div>
        </ScrollArea>
      ) : (
        <div className="h-full  p-4 md:px-8 space-y-4">{children}</div>
      )}
    </>
  );
};

export default MainContainer;
