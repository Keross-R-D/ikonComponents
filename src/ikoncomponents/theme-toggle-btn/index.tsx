"use client"

import * as React from "react"
import { Waves, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../shadcn/dropdown-menu"
import { Button } from "../../shadcn/button"

export function ThemeToggleBtn() {
    const { theme, setTheme } = useTheme()

    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {theme === "light" && (
                        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
                    )}
                    {theme === "dark" && (
                        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
                    )}
                    {theme === "blue-dark" && (
                        <Waves className="h-[1.2rem] w-[1.2rem] transition-all" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("blue-dark")}>Keross</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
