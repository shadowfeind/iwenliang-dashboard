import { signOut } from "@/auth";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <Button className="flex items-center gap-2 w-full">
        <LogOut className="size-4" />
        Logout
      </Button>
    </form>
  );
};

export default LogoutButton;
