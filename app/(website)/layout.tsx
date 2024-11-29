import SiteHeader from "@/components/website/SiteHeader";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const WebsiteLayout = ({ children }: Props) => {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
};

export default WebsiteLayout;
