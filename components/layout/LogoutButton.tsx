import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

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
