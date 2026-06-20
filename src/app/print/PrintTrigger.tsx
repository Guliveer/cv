"use client"

import { useEffect } from "react"

export default function PrintTrigger() {
    useEffect(() => {
        const timer = setTimeout(() => window.print(), 400)
        window.addEventListener("afterprint", () => window.close(), { once: true })
        return () => clearTimeout(timer)
    }, [])

    return null
}
