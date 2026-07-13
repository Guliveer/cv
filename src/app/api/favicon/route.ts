import { NextResponse } from "next/server"
import { getProfile } from "@/lib/data"

export const dynamic = "force-dynamic"

export async function GET() {
    const profile = getProfile()
    const name = profile?.name ?? "CV"
    const initials = name
        .split(" ")
        .filter(Boolean)
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect width="64" height="64" fill="#09090B"/>
    <text x="32" y="32" text-anchor="middle" dominant-baseline="central" font-family="'Space Grotesk', 'Trebuchet MS', sans-serif" font-weight="700" font-size="38" fill="#DFE104">${initials}</text>
</svg>`

    return new NextResponse(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
    })
}
