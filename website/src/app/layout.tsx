import type React from "react"
import type { Metadata } from "next"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { getProfile } from "@/lib/queries";


const profile = await getProfile();

export const metadata: Metadata = {
    title: (profile?.name ? `CV | ${profile.name}` : "CV"),
    description: "Easily scalable CV built with Next.js, Sanity and shadcni",
    keywords: [
        "CV",
        "Resume",
        "Portfolio",
        "Next.js",
        "Sanity",
        "Tailwind CSS",
        "shadcn/ui",
        "React",
        "TypeScript",
    ],
    authors: [
        {
            name: "Oliwer Pawelski",
            url: "https://github.com/Guliveer",
        },
    ],
    creator: "Oliwer Pawelski",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Theme color */}
                <meta name="theme-color" content="var(--primary)" />
            </head>
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
