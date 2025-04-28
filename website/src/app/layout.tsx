import type React from "react"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import type { Metadata } from "next"
import { Analytics } from '@vercel/analytics/next'
import { getProfile } from "@/lib/queries";

const profile = await getProfile();

// DO NOT TOUCH THE METADATA (Except description and keywords)
export const metadata: Metadata = {
    title: (profile?.name ? `CV | ${profile.name}` : "CV"),
    description: "Easily scalable CV built with Next.js, Sanity and shadcn",
    keywords: [
        "CV",
        "Resume",
        "Portfolio",
        "Next.js",
        "Sanity",
        "CMS",
        "Tailwind CSS",
        "shadcn",
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
    icons: "/favicon.svg",
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
                    <Analytics /> {/* Vercel analytics */}
                </ThemeProvider>
            </body>
        </html>
    )
}
