import React from "react"
import ProfileSection from "@/components/ProfileSection"
import ExperienceSection from "@/components/ExperienceSection"
import EducationSection from "@/components/EducationSection"
import ProjectsSection from "@/components/ProjectsSection"
import { HeaderActions } from "@/components/HeaderActions"
import { NoiseOverlay } from "@/components/NoiseOverlay"
import { StatsMarquee } from "@/components/StatsMarquee"
import { SkillsMarquee } from "@/components/SkillsMarquee"
import { Footer } from "@/components/Footer"

export const revalidate = 3600

export default function Home() {
    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            <NoiseOverlay />
            <HeaderActions />

            <ProfileSection />

            <StatsMarquee />

            <SkillsMarquee />

            <div className="max-w-[95vw] mx-auto">
                <ExperienceSection />

                <EducationSection />

                <ProjectsSection />
            </div>

            <Footer />
        </main>
    )
}
