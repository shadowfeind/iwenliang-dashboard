"use client";

import { PRIVATE_ROUTES } from "@/config/constant/routes";
import { usePathname } from "next/navigation";

type Props = {};

const SiteHeader = (props: Props) => {
  const pathname = usePathname();
  const isExcludedRoute = PRIVATE_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!isExcludedRoute && (
        <div className="w-full py-2 bg-black text-white">SiteHeader</div>
      )}
    </>
  );
};

export default SiteHeader;
