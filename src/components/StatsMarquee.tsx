"use client"

import Marquee from "react-fast-marquee"
import { getExperience, getProjects, getProfile } from "@/lib/data"
import AnimatedCounter from "./AnimatedCounter"

export function StatsMarquee() {
    const experience = getExperience()
    const projects = getProjects()
    const profile = getProfile()

    const stats = [
        { value: String(experience.length), label: "ROLES" },
        { value: "///", label: "" },
        { value: String(projects.length), label: "PROJECTS" },
        { value: "///", label: "" },
        { value: String(profile.skills.length), label: "SKILLS" },
        { value: "///", label: "" },
        { value: profile.location.country.toUpperCase(), label: "BASED IN" },
        { value: "///", label: "" },
        { value: "OLIWER", label: "" },
        { value: "///", label: "" },
        { value: "PAWELSKI", label: "" },
        { value: "///", label: "" },
    ]

    return (
        <div className="bg-accent text-accent-foreground">
            <Marquee speed={80} autoFill>
                {stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-4 px-8">
                        {stat.label ? (
                            <AnimatedCounter value={stat.value} label={stat.label} />
                        ) : (
                            <span className="text-4xl md:text-6xl font-bold font-heading uppercase tracking-tighter opacity-40">
                                {stat.value}
                            </span>
                        )}
                    </div>
                ))}
            </Marquee>
        </div>
    )
}
