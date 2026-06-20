import type React from "react"
import "@/app/print/print.css"

export const metadata = {
    title: "CV — Print",
    robots: { index: false },
}

export default function PrintLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
            </head>
            {children}
        </>
    )
}
