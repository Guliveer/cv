import type React from "react"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { getProfile } from "@/lib/data"

const profile = getProfile()

export const metadata: Metadata = {
    title: profile?.name ? `CV | ${profile.name}` : "CV",
    description: "Easily scalable CV built with Next.js and shadcn",
    keywords: ["CV", "Resume", "Portfolio", "Next.js", "Tailwind CSS", "shadcn", "React", "TypeScript"],
    authors: [{ name: "Oliwer Pawelski", url: "https://github.com/Guliveer" }],
    creator: "Oliwer Pawelski",
    icons: { icon: "/api/favicon" },
}

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <head>
                <meta name="theme-color" content="var(--primary)" />
            </head>
            <ThemeProvider attribute="class" forcedTheme="dark" disableTransitionOnChange>
                {children}
                <Analytics />
            </ThemeProvider>
        </>
    )
}
