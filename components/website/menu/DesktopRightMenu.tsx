import HeaderProfile from "@/components/layout/HeaderProfile";
import { ShoppingCart } from "lucide-react";

const DesktopRightMenu = () => {
  return (
    <div className="flex items-center gap-4">
      <ShoppingCart className="size-5 font-semibold" />
      <HeaderProfile />
    </div>
  );
};

export default DesktopRightMenu;
