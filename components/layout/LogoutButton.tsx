"use client";
import React from "react";
import { Button } from "../ui/button";
import { logout } from "@/actions/auth.action";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <Button
      onClick={async () => {
        await logout();
      }}
      className="flex items-center gap-2 w-full"
    >
      <LogOut className="size-4" />
      Logout
    </Button>
  );
};

export default LogoutButton;
