import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  href: string;
  styles?: string;
};

const BigButton = ({ name, href, styles }: Props) => {
  return (
    <div className={cn("w-full flex justify-center", styles)}>
      <Link href={href}>
        <Button variant={"default"} size={"custom"}>
          {name}
        </Button>
      </Link>
    </div>
  );
};

export default BigButton;
