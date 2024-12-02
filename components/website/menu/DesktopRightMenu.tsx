import HeaderProfile from "@/components/layout/HeaderProfile";
import { ShoppingCart } from "lucide-react";

const DesktopRightMenu = () => {
  return (
    <div className="flex gap-2 justify-center">
      <ShoppingCart className="size-5 font-semibold" />
      <HeaderProfile />
    </div>
  );
};

export default DesktopRightMenu;
