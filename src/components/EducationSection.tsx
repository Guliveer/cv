import SectionHeader from "./SectionHeader"
import { getEducation } from "@/lib/data"
import { shortDate } from "@/lib/utils"
import { DateBadge } from "@/components/ui/date-badge"
import { FadeUp } from "./FadeUp"

export default async function EducationSection() {
    const education = await getEducation()
    if (!education) return null

    const formattedEducation = education.map((edu) => ({
        ...edu,
        startDate: shortDate(edu.startDate, "en-US"),
        endDate: edu.endDate
            ? shortDate(edu.endDate, "en-US")
            : "Present",
    }))

    return (
        <section>
            <SectionHeader title="Education" />

            <div className="space-y-px bg-border">
                {formattedEducation.map((edu: any, index: number) => (
                    <FadeUp key={index} delay={index * 0.07}>
                        <div className="group bg-background p-6 md:p-8 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                                <div>
                                    <div className="text-lg md:text-xl font-bold uppercase tracking-tight">
                                        {edu.field}
                                    </div>
                                    <p className="text-base text-muted-foreground group-hover:text-accent-foreground/70 uppercase tracking-wider mt-1">
                                        {edu.school}
                                        {edu.degree && (
                                            <span className="ml-2 text-xs border border-current px-2 py-0.5">
                                                {edu.degree}
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <DateBadge
                                    startDate={edu.startDate}
                                    endDate={edu.endDate}
                                />
                            </div>
                            {edu.description && (
                                <p className="mt-4 text-muted-foreground group-hover:text-accent-foreground/70 whitespace-pre-line leading-relaxed">
                                    {edu.description}
                                </p>
                            )}
                        </div>
                    </FadeUp>
                ))}
            </div>
        </section>
    )
}
