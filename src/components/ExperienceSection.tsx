import SectionHeader from "./SectionHeader"
import Image from "next/image"
import Link from "next/link"
import { BriefcaseIcon, ExternalLink } from "lucide-react"
import { getExperience } from "@/lib/data"
import { shortDate } from "@/lib/utils"
import { DateBadge } from "@/components/ui/date-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FadeUp } from "./FadeUp"

export default async function ExperienceSection() {
    const experiences = await getExperience();
    if (!experiences) return renderSkeleton();

    const formattedExperiences = experiences.map((experience) => ({
        ...experience,
        startDate: shortDate(experience.startDate, "en-US"),
        endDate: experience.endDate ? shortDate(experience.endDate, "en-US") : "Present",
    }));

    const sortedExperiences = formattedExperiences.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateB - dateA;
    });

    return renderSection(sortedExperiences);
}

function renderSection(data: any) {
    return (
        <section>
            <SectionHeader title="Experience" />

            <div className="space-y-8">
                {data.map((experience: any, index: number) => (
                    <FadeUp key={index} delay={index * 0.05}>
                        {/* Company header with icon */}
                        {index === 0 || data[index - 1].company !== experience.company ? (
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-primary/10 p-1.5 rounded-md overflow-hidden">
                                    {experience.companyLogo ? (
                                        <Image
                                            src={experience.companyLogo}
                                            alt={experience.company}
                                            width={40}
                                            height={40}
                                            className="w-7 h-7 rounded-md"
                                        />
                                    ) : (
                                        <BriefcaseIcon className="w-7 h-7 text-primary" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-xl font-semibold text-primary">
                                        {experience.url ? (
                                            <Link
                                                href={experience.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 hover:underline"
                                            >
                                                <span>{experience.company}</span>
                                                <ExternalLink className="w-5 h-auto" />
                                            </Link>
                                        ) : (
                                            experience.company
                                        )}
                                    </p>
                                    {experience.formerlyKnownAs?.length > 0 && (
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            formerly {experience.formerlyKnownAs.join(" → ")}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : null}

                        {/* Experience card */}
                        <div className="ml-5 pl-6 border-l-2 border-primary/20">
                            <div className="relative">
                                <span className="absolute -left-6 top-1/3 w-4 h-px bg-primary/20" />
                                <Card className="overflow-hidden border-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/5 bg-secondary">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                                            <div>
                                                <div className="text-xl font-semibold flex items-center gap-2">
                                                    <span>{experience.position}</span>
                                                    {experience.endDate === "Present" && (
                                                        <Badge variant="default" className="text-xs cursor-default">
                                                            Current
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <DateBadge startDate={experience.startDate} endDate={experience.endDate} />
                                                </div>
                                            </div>
                                        </div>
                                        {experience.description && (
                                            <p className="mt-4 text-muted-foreground whitespace-pre-line leading-relaxed">{experience.description}</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </FadeUp>
                ))}
            </div>
        </section>
    );
}

function renderSkeleton() {
    return (
        <section>
            <SectionHeader title="Experience" />
            <div className="space-y-8">
                {[1, 2, 3].map((_, index) => (
                    <div key={index}>
                        <div className="flex items-center gap-3 mb-3">
                            <Skeleton className="h-10 w-10 rounded-md" />
                            <Skeleton className="h-6 w-48" />
                        </div>
                        <div className="ml-5 pl-6 border-l-2 border-primary/20">
                            <div className="relative">
                                <span className="absolute -left-6 top-1/3 w-4 h-px bg-primary/20" />
                                <Skeleton className="h-32 w-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
