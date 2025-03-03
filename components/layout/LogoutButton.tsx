"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <Button
      onClick={() => signOut()}
      className="flex items-center gap-2 w-full"
    >
      <LogOut className="size-4" />
      Logout
    </Button>
  );
};

export default LogoutButton;
