import SectionHeader from "./SectionHeader"
import Image from "next/image"
import Link from "next/link"
import { BackpackIcon, ExternalLinkIcon } from "@radix-ui/react-icons"
import { getExperience } from "@/lib/data"
import { shortDate } from "@/lib/utils"
import { DateBadge } from "@/components/ui/date-badge"
import { FadeUp } from "./FadeUp"

export default async function ExperienceSection() {
    const experiences = await getExperience()
    if (!experiences) return null

    const formattedExperiences = experiences.map((experience) => ({
        ...experience,
        startDate: shortDate(experience.startDate, "en-US"),
        endDate: experience.endDate
            ? shortDate(experience.endDate, "en-US")
            : "Present",
    }))

    const sortedExperiences = formattedExperiences.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime()
        const dateB = new Date(b.startDate).getTime()
        return dateB - dateA
    })

    return (
        <section>
            <SectionHeader title="Experience" />

            <div className="space-y-px bg-border">
                {sortedExperiences.map((experience: any, index: number) => (
                    <FadeUp key={index} delay={index * 0.05}>
                            <div className={`group bg-background p-6 md:p-8 hover:bg-accent hover:text-accent-foreground transition-all duration-300${index > 0 && sortedExperiences[index - 1].company === experience.company ? " border-l-4 border-accent" : ""}`}>
                            {/* Company header */}
                            {index === 0 ||
                            sortedExperiences[index - 1].company !==
                                experience.company ? (
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-muted p-1.5 overflow-hidden">
                                        {experience.companyLogo ? (
                                            <Image
                                                src={experience.companyLogo}
                                                alt={experience.company}
                                                width={40}
                                                height={40}
                                                className="w-7 h-7 object-cover"
                                            />
                                        ) : (
                                             <BackpackIcon className="w-7 h-7 text-accent" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                                            {experience.url ? (
                                                <Link
                                                    href={experience.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 hover:text-accent-foreground"
                                                >
                                                    <span>
                                                        {experience.company}
                                                    </span>
                                                     <ExternalLinkIcon className="w-4 h-auto" />
                                                </Link>
                                            ) : (
                                                experience.company
                                            )}
                                        </p>
                                        {experience.formerlyKnownAs?.length >
                                            0 && (
                                            <p className="text-xs text-muted-foreground group-hover:text-accent-foreground/70 uppercase tracking-widest mt-0.5">
                                                FORMERLY{" "}
                                                {experience.formerlyKnownAs.join(
                                                    " → "
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ) : null}

                            {/* Experience details */}
                            <div className="md:ml-10">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                                    <div>
                                        <div className="text-lg md:text-xl font-semibold uppercase tracking-tight flex items-center gap-2">
                                            <span>{experience.position}</span>
                                            {experience.endDate === "Present" && (
                                                <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 font-bold uppercase tracking-widest">
                                                    CURRENT
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-1">
                                            <DateBadge
                                                startDate={experience.startDate}
                                                endDate={experience.endDate}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {experience.description && (
                                    <p className="mt-4 text-muted-foreground group-hover:text-accent-foreground/70 whitespace-pre-line leading-relaxed">
                                        {experience.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </FadeUp>
                ))}
            </div>
        </section>
    )
}
