"use client"

import { SunIcon, MoonIcon, DesktopIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ThemeToggle() {
    const { setTheme } = useTheme()
    const [curTheme, setCurTheme] = useState("dark")

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark"
        setCurTheme(savedTheme)
        setTheme(savedTheme)
    }, [setTheme])

    const handleThemeChange = (theme: string) => {
        setCurTheme(theme)
        setTheme(theme)
        localStorage.setItem("theme", theme)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none"
                >
                    {curTheme === "system" && (
                        <DesktopIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    )}
                    {curTheme === "dark" && (
                        <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    )}
                    {curTheme === "light" && (
                        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-none border-2 border-border">
                <DropdownMenuItem
                    className="uppercase tracking-wider text-xs font-bold cursor-pointer"
                    onClick={() => handleThemeChange("light")}
                >
                    LIGHT
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="uppercase tracking-wider text-xs font-bold cursor-pointer"
                    onClick={() => handleThemeChange("dark")}
                >
                    DARK
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="uppercase tracking-wider text-xs font-bold cursor-pointer"
                    onClick={() => handleThemeChange("system")}
                >
                    SYSTEM
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
