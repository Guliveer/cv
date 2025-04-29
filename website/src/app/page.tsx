import React from "react";
import ProfileSection from "@/components/ProfileSection"
import ExperienceSection from "@/components/ExperienceSection"
import EducationSection from "@/components/EducationSection"
import ProjectsSection from "@/components/ProjectsSection"
import { HeaderActions } from "@/components/HeaderActions"
import { Separator } from "@/components/ui/separator"
import {Github} from "lucide-react";


export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-background/90 relative overflow-hidden">

            {/* Decorative elements */}
            <div className="print:hidden absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10 dark:opacity-5 pointer-events-none select-none">
                <div className="absolute top-0 right-0 bg-primary w-96 h-96 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/4 bg-primary/60 w-96 h-96 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-2/3 bg-primary w-96 h-96 rounded-full blur-3xl" />
            </div>

            <HeaderActions />

            <div className="container mx-auto py-10 px-4 md:px-6 relative z-10">
                <ProfileSection />

                <Separator className="my-12 print:hidden" />

                <ExperienceSection />

                <Separator className="my-12 print:hidden" />

                <EducationSection />

                <Separator className="my-12 print:hidden" />

                <ProjectsSection />
            </div>

            {/* DO NOT TOUCH THE FOOTER */}
            <footer className="print-hidden bg-transparent print:hidden">
                <div className="container bg-transparent mx-auto mb-6">
                    <Separator className="mb-6" />
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm text-muted-foreground">
                            Designed & built by <span className="font-medium text-primary">Oliwer Pawelski</span>
                        </p>
                        <a
                            href="https://github.com/Guliveer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                        >
                            <Github className="w-5 h-5" />
                            <span>github.com/Guliveer</span>
                        </a>
                    </div>
                </div>
            </footer>
        </main>
    )
}
