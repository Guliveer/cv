import cfg from "@/../config.json"
import Link from "next/link"
import SectionHeader from "./SectionHeader"
import { Github, ExternalLink, Star } from "lucide-react"
import { getProjects } from "@/lib/queries"
import { enrichProjects } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton";

export default async function ProjectsSection() {
    const projects = await getProjects();
    if (!projects) return renderSkeleton();

    const projectsList = await enrichProjects(projects, cfg.sortProjects);

    return renderProjects(projectsList);
}

function renderProjects(data: any[]) {
    return (
        <section>
            <SectionHeader title="Projects" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((project, index) => (
                    <Card key={index} className="group overflow-hidden border-none transition-all duration-300 h-fit flex flex-col">
                        <div className="h-2 bg-primary" />
                        <CardContent className="p-6 bg-secondary">
                            <div className="flex justify-between items-start">
                                <p className="text-xl font-semibold">
                                    {project.title}
                                </p>
                                <div className="flex items-center gap-2">
                                    {cfg.showStargazersCount && project.stars > 0 && (
                                        <Badge
                                            variant="outline"
                                            className="cursor-default flex items-center gap-1"
                                        >
                                            <Star className="h-3 w-auto text-muted-foreground" />
                                            <span className="h-3.5">{project.stars}</span>
                                        </Badge>
                                    )}
                                    {project.github && (
                                        <Github className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </div>
                            </div>

                            {project.description && (
                                <p className="mt-2 font-medium text-muted-foreground">{project.description}</p>
                            )}

                            {project.technologies && (
                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {project.technologies.map((tech: string, techIndex: number) => (
                                        <Badge
                                            key={techIndex}
                                            variant="default"
                                            className="cursor-default"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {project.github && (
                                <div className="mt-4">
                                    {(() => {
                                        const match = project.github.match(/github\.com\/([^/]+)\/([^/]+)/);
                                        if (match) {
                                            const [, owner, repo] = match;
                                            return (
                                                <Link
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
                                                >
                                                    {owner}/{repo} <ExternalLink className="h-3.5 w-auto" />
                                                </Link>
                                            );
                                        }
                                        return null;
                                    })()}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}

function renderSkeleton() {
    return (
        <section>
            <SectionHeader title="Projects" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                    <div key={index}>
                        <Skeleton className="h-48 w-full" />
                    </div>
                ))}
            </div>
        </section>
    );
}
