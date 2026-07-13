"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function PrintTrigger() {
    const searchParams = useSearchParams()
    const isPreview = searchParams.has("preview")

    useEffect(() => {
        if (isPreview) return
        const timer = setTimeout(() => window.print(), 400)
        window.addEventListener("afterprint", () => window.close(), { once: true })
        return () => clearTimeout(timer)
    }, [isPreview])

    return null
}
