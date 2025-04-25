import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import SectionHeader from "./SectionHeader"
import {BriefcaseIcon, ExternalLink} from "lucide-react"
import { getExperience } from "@/lib/queries"
import { shortDate } from "@/lib/utils"
import { urlFor } from "@/lib/sanity"
import Image from "next/image"
import Link from "next/link"
import { DateBadge } from "@/components/ui/date-badge";
import {Skeleton} from "@/components/ui/skeleton";

// Cache object
const expCache: { data: any[]; expiry: number } = { data: [], expiry: 0 };

export default async function ExperienceSection() {
    // Check if the cache is valid
    if (expCache.data && expCache.expiry > Date.now()) {
        return renderSection(expCache.data);
    }

    const experiences = await getExperience();
    if (!experiences) return renderSkeleton();

    // Preprocess and format dates
    const formattedExperiences = experiences.map((experience) => ({
        ...experience,
        startDate: shortDate(experience.startDate, "en-US"),
        endDate: experience.endDate ? shortDate(experience.endDate, "en-US") : "Present",
    }));

    // Sort experiences by startDate (oldest first)
    const sortedExperiences = formattedExperiences.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateB - dateA;
    });

    expCache.data = sortedExperiences;
    expCache.expiry = Date.now() + 10 * 60 * 1000; // Cache for 10 minutes

    return renderSection(sortedExperiences);
}


function renderSection(data: any) {
    return (
        <section>
            <SectionHeader title="Experience" />

            <div className="space-y-8">
                {data.map((experience: any, index: number) => (
                    <div key={index} >
                        {/* Company header with icon */}
                        {index === 0 || data[index - 1].company !== experience.company ? (
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-primary/10 p-1.5 rounded-md overflow-hidden">
                                    {experience.companyLogo ? (
                                        <Image
                                            src={urlFor(experience.companyLogo).url()}
                                            alt={experience.company}
                                            width={40}
                                            height={40}
                                            className="w-7 h-7 rounded-md"
                                        />
                                    ) : (
                                        <BriefcaseIcon className="w-7 h-7 text-primary" />
                                    )}
                                </div>
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
                            </div>
                        ) : null}

                        {/* Experience card */}
                        <div className="ml-5 pl-6 border-l-2 border-primary/20">
                            <div className="relative">
                                {/* Small connector line */}
                                <span className="absolute -left-6 top-1/3 w-4 h-px bg-primary/20" />

                                <Card className="overflow-hidden border-none transition-all duration-300 hover:bg-card/80">
                                    <CardContent className="p-6 bg-secondary">
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
                                                    {/*<Badge variant="outline" className="text-accent-foreground">*/}
                                                    {/*    {calcDuration(experience.startDate, experience.endDate)} months*/}
                                                    {/*</Badge>*/}
                                                </div>
                                            </div>
                                        </div>
                                        {experience.description && ( // Show description if available
                                            <p className="mt-4 text-muted-foreground">{experience.description}</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
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
                        {/* Company header */}
                        <div className="flex items-center gap-3 mb-3">
                            <Skeleton className="h-10 w-10 rounded-md" />
                            <Skeleton className="h-6 w-48" />
                        </div>

                        {/* Experience card */}
                        <div className="ml-5 pl-6 border-l-2 border-primary/20">
                            <div className="relative">
                                <span className="absolute -left-6 top-1/3 w-4 h-px bg-primary/20" />
                                <Skeleton className="h-48 w-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
