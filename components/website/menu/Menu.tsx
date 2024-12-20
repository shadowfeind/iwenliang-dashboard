import Image from "next/image";
import { MobileNavigation } from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";
import DesktopRightMenu from "./DesktopRightMenu";
import Logo from "../../../public/images/mainlogo.png";

const Menu = () => {
  return (
    <div className="flex justify-between items-center px-4 py-4 lg:px-8 border-b-2 ">
      <div>
        <Image height={43} width={262} src={Logo} alt="iwenliang" />
      </div>
      <div className=" hidden md:block">
        <DesktopNavigation />
      </div>
      <div className=" hidden md:block">
        <DesktopRightMenu />
      </div>
      <div className="block md:hidden">
        <MobileNavigation />
      </div>
    </div>
  );
};

export default Menu;
