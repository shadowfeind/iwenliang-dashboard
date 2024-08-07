"use client";

import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type Props = {};

const ThemeToggle = (props: Props) => {
  const { setTheme } = useTheme();

  const handleSwitch = (state: string) => {
    if (state === "checked") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-[1.2rem] w-[1.2rem]  transition-all" />
      <Switch
        id="airplane-mode"
        // for typescript checking null
        onClick={(e) => {
          const state = e.currentTarget.getAttribute("data-state");
          if (state !== null) {
            handleSwitch(state);
          }
        }}
      />
      <Moon className="h-[1.2rem] w-[1.2rem] transition-all " />
    </div>
  );
};

export default ThemeToggle;
