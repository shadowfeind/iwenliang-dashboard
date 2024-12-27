import { Card } from "@/components/ui/card";
import React from "react";
import { Cart } from "../cart/Cart";
import HeaderProfile from "@/components/layout/HeaderProfile";
import Link from "next/link";

type Props = {};

const MobileFoooterMenu = (props: Props) => {
  return (
    <div className="fixed bottom-0 left-0 block w-full md:hidden">
      <Card className="rounded-none border-t">
        <div className="grid grid-cols-3 items-center justify-items-center h-12">
          <Cart />
          <Link href="/" className="text-md font-bold">
            Home
          </Link>
          <HeaderProfile />
        </div>
      </Card>
    </div>
  );
};

export default MobileFoooterMenu;
