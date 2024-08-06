import ThemeToggle from "./theme-toggle/ThemeToggle";

export default function Header() {
  return (
    <div className="w-full fixed left-0 right-0 top-0 border-b ">
      <nav className="flex items-center justify-between px-4 h-12">
        <div>iwenliang</div>
        <div className="flex gap-4">
          <ThemeToggle />
          <h1>K</h1>
        </div>
      </nav>
    </div>
  );
}
