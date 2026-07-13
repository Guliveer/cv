"use client"

import { useState, useCallback } from "react"
import dynamic from "next/dynamic"

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false })
const MouseReactiveGrain = dynamic(() => import("@/components/MouseReactiveGrain"), { ssr: false })
const HeroWireframe = dynamic(() => import("@/components/HeroWireframe"), { ssr: false })
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false })

export function ClientProviders() {
    const [loaded, setLoaded] = useState(false)

    const handleLoadComplete = useCallback(() => {
        setLoaded(true)
    }, [])

    return (
        <>
            {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
            <MouseReactiveGrain />
            <CustomCursor />
        </>
    )
}

export { HeroWireframe }
