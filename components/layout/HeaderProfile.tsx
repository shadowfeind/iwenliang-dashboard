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
import { UserRound } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";

const HeaderProfile = async () => {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link
        href="/sign-in"
        className="flex items-center justify-center gap-2 font-semibold cursor-pointer"
      >
        <UserRound className="size-5" />
        Sign In
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className="bg-primary/80">
            {session?.user?.fullName?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[300px] p-5">
        <DropdownMenuLabel>
          <div>
            <h3 className="text-sm font-bold capitalize">
              {session?.user?.fullName || "Guest"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {session?.user?.role || "Unknown Role"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <p>
            <Link href="/dashboard" className="text-sm">
              Dashboard
            </Link>
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="space-y-2 pb-5 mt-3">
          <DropdownMenuItem asChild className="cursor-pointer p-0">
            <LogoutButton />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderProfile;
