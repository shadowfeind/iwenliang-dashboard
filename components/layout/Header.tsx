import Link from "next/link";
import HeaderProfile from "./HeaderProfile";
import { MobileNav } from "./side-nav/MobileNav";

const Header = ({ role }: { role: string }) => {
  return (
    <div className="w-full fixed left-0 right-0 top-0 border-b z-10">
      <nav className="flex items-center justify-between px-4 h-12">
        <MobileNav role={role} />
        <Link href="/">iwenliang</Link>
        <div className="flex gap-4">
          <HeaderProfile />
        </div>
      </nav>
    </div>
  );
};

export default Header;
