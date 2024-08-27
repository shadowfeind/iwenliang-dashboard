import HeaderProfile from "./HeaderProfile";
import { MobileNav } from "./side-nav/MobileNav";
import ThemeToggle from "./theme-toggle/ThemeToggle";

export default function Header() {
  return (
    <div className="w-full fixed left-0 right-0 top-0 border-b z-10">
      <nav className="flex items-center justify-between px-4 h-12">
        <MobileNav />
        <div>iwenliang</div>
        <div className="flex gap-4">
          <ThemeToggle />
          <HeaderProfile />
        </div>
      </nav>
    </div>
  );
}
