import SectionHeader from "./SectionHeader"
import { getEducation } from "@/lib/queries";
import { shortDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton";
import { DateBadge } from "@/components/ui/date-badge";
import { Card, CardContent } from "@/components/ui/card"

export default async function EducationSection() {
    const education = await getEducation();
    if (!education) return renderSkeleton();

    // Preprocess and format dates
    const formattedEducation = education.map((edu) => ({
        ...edu,
        startDate: shortDate(edu.startDate, "en-US"),
        endDate: edu.endDate ? shortDate(edu.endDate, "en-US") : "Present",
    }));

    return renderSection(formattedEducation);
}

function renderSection(data: any) {
    return (
        <section>
            <SectionHeader title="Education" />

            <div className="space-y-4">
                {data.map((edu: any, index: number) => (
                    <div key={index} >
                        <Card className="overflow-hidden border-none transition-all duration-300 hover:bg-card/80">
                            <CardContent className="p-6 bg-secondary">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                                    <div>
                                        <div className="flex items-center text-xl font-semibold gap-1.5">
                                            <span>{edu.field}</span>

                                            {edu.degree && ( // Show degree if available
                                                <Badge variant="secondary" className="text-sm bg-muted-foreground/80 text-secondary">
                                                    {edu.degree}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-lg text-primary/90 font-medium">{edu.school}</p>
                                    </div>
                                    <DateBadge startDate={edu.startDate} endDate={edu.endDate} />
                                </div>
                                {edu.description && ( // Show description if available
                                    <p className="mt-4 text-muted-foreground whitespace-pre-line">{edu.description}</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    )
}

function renderSkeleton() {
    return (
        <section>
            <SectionHeader title="Education" />

            <div className="space-y-4">
                {[1, 2].map((_, index) => (
                    <div key={index}>
                        <Skeleton className="h-48 w-full" />
                    </div>
                ))}
            </div>
        </section>
    );
}
