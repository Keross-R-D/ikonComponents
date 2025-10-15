"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useCallback } from "react";

import { Laptop, Moon, Sun, Check, Waves } from "lucide-react";
import { Button } from "../shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn/ui/dropdown-menu";

export function ThemeSwitcher() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = theme === "system" ? resolvedTheme : theme;

  const setThemeSafe = useCallback(
    (value: string) => {
      setTheme(value);
      if (value === "light" || value === "dark") {
        document.documentElement.classList.remove("blue-dark");
      }
      if (value === "blue-dark") {
        document.documentElement.classList.add("blue-dark");
      }
    },
    [setTheme]
  );

  if (!mounted) return null;

  const triggerIcon = (() => {
    if (activeTheme === "blue-dark") return <Waves className="h-5 w-5" />;
    if (activeTheme === "dark") return <Moon className="h-5 w-5" />;
    if (activeTheme === "light") return <Sun className="h-5 w-5" />;
    return <Laptop className="h-5 w-5" />;
  })();

  const isActive = (value: string) => activeTheme === value;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Change theme"
          title={`Theme: ${theme === "system" ? `system (${resolvedTheme})` : theme}`}
        >
          {triggerIcon}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuItem
          onClick={() => setThemeSafe("light")}
          className="flex items-center justify-between gap-2"
        >
          <div className="flex items-center">
            <Sun className="mr-2 h-4 w-4" /> Light
          </div>
          {isActive("light") && <Check className="h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setThemeSafe("dark")}
          className="flex items-center justify-between gap-2"
        >
          <div className="flex items-center">
            <Moon className="mr-2 h-4 w-4" /> Dark
          </div>
          {isActive("dark") && <Check className="h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setThemeSafe("blue-dark")}
          className="flex items-center justify-between gap-2"
        >
          <div className="flex items-center">
            <Waves className="mr-2 h-4 w-4" /> Blue Dark
          </div>
          {isActive("blue-dark") && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
