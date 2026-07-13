"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function WireframeGrid() {
    const meshRef = useRef<THREE.Mesh>(null)
    const mouse = useRef({ x: 0, y: 0 })
    const { viewport } = useThree()

    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(20, 12, 25, 15)
        return geo
    }, [])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    useFrame((state) => {
        if (!meshRef.current) return
        const geo = meshRef.current.geometry as THREE.PlaneGeometry
        const posAttr = geo.attributes.position as THREE.BufferAttribute

        const time = state.clock.elapsedTime

        for (let i = 0; i < posAttr.count; i++) {
            const x = posAttr.getX(i)
            const y = posAttr.getY(i)

            const mouseInfluenceX = (mouse.current.x * viewport.width) * 0.15
            const mouseInfluenceY = (mouse.current.y * viewport.height) * 0.15

            const distX = x - mouseInfluenceX
            const distY = y - mouseInfluenceY
            const dist = Math.sqrt(distX * distX + distY * distY)

            const wave = Math.sin(time * 0.5 + x * 0.3 + y * 0.3) * 0.15
            const mouseWave = Math.max(0, 1.5 - dist) * 0.4

            posAttr.setZ(i, wave + mouseWave)
        }

        posAttr.needsUpdate = true
        geo.computeVertexNormals()
    })

    return (
        <mesh ref={meshRef} rotation={[-0.3, 0, 0]} position={[0, 0, -2]}>
            <planeGeometry args={[20, 12, 25, 15]} />
            <meshBasicMaterial
                color="#DFE104"
                wireframe
                transparent
                opacity={0.08}
            />
        </mesh>
    )
}

function Scene() {
    return (
        <>
            <WireframeGrid />
        </>
    )
}

export default function HeroWireframe() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 1.5]}
            >
                <Scene />
            </Canvas>
        </div>
    )
}
