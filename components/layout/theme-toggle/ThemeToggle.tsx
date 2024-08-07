"use client";

import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {};

const ThemeToggle = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSwitch = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      <Switch
        id="theme-toggle"
        checked={theme === "dark"}
        onCheckedChange={handleSwitch}
      />
      <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
    </div>
  );
};

export default ThemeToggle;
