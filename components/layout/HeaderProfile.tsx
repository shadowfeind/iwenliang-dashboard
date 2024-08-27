"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import LogoutButton from "./LogoutButton";
import { useAuth } from "@/config/providers/AuthProvider";

const HeaderProfile = () => {
  const { user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className=" bg-primary/80">
            {user?.fullName[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[300px] p-5">
        <DropdownMenuLabel>
          <div>
            <h3 className="text-sm font-bold capitalize">{user?.fullName}</h3>
            <p className="text-xs text-primary ">{user?.role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="space-y-2 pb-5 mt-3">
          <DropdownMenuItem className=" flex items-center gap-3 text-secondary-foreground/50 cursor-pointer">
            <LogoutButton />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderProfile;
