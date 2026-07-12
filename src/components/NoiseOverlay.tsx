"use client"

export function NoiseOverlay() {
    return (
        <svg className="noise-overlay" aria-hidden="true">
            <title>Noise texture</title>
            <filter id="noise">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.8"
                    numOctaves="4"
                    stitchTiles="stitch"
                />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
    )
}
