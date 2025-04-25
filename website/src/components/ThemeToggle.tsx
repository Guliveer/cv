"use client"

import { Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
    const { setTheme } = useTheme();
    const [curTheme, setCurTheme] = useState("system");

    // Load theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "system";
        setCurTheme(savedTheme);
        setTheme(savedTheme);
    }, [setTheme]);

    const handleThemeChange = (theme: string) => {
        setCurTheme(theme);
        setTheme(theme);
        localStorage.setItem("theme", theme); // Save theme to localStorage
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                    {curTheme === "system" && (
                        <Monitor className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    )}
                    {curTheme === "dark" && (
                        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    )}
                    {curTheme === "light" && (
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleThemeChange("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}