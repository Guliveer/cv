import cfg from "@/../config.json"
import Link from "next/link"
import SectionHeader from "./SectionHeader"
import { Github, ExternalLink, Star } from "lucide-react"
import { getProjects } from "@/lib/data"
import { enrichProjects } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton";
import { FadeUp } from "./FadeUp"

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
                {data.map((project, index) => {
                    const match = project.github?.match(/github\.com\/([^/]+)\/([^/]+)/);
                    const repoPath = match ? `${match[1]}/${match[2]}` : null;

                    return (
                        <FadeUp key={index} delay={index * 0.05}>
                            <Card className="group overflow-hidden border-none h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 bg-secondary">
                                {/* Accent bar — expands on hover */}
                                <div className="h-0.5 bg-primary/20 relative overflow-hidden">
                                    <div className="absolute inset-y-0 left-0 w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full" />
                                </div>

                                <CardContent className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-xl font-semibold">{project.title}</p>
                                        <div className="flex items-center gap-2 shrink-0 ml-2">
                                            {cfg.showStargazersCount && project.stars > 0 && (
                                                <Badge variant="outline" className="cursor-default flex items-center gap-1">
                                                    <Star className="h-3 w-auto text-muted-foreground" />
                                                    <span>{project.stars}</span>
                                                </Badge>
                                            )}
                                            {project.github && (
                                                <Github className="h-5 w-5 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
                                            )}
                                        </div>
                                    </div>

                                    {project.description && (
                                        <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                                    )}

                                    {project.technologies && (
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {project.technologies.map((tech: string, techIndex: number) => (
                                                <Badge key={techIndex} variant="default" className="cursor-default">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                    {repoPath && (
                                        <div className="mt-auto pt-4">
                                            <Link
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline transition-colors"
                                            >
                                                {repoPath}
                                                <ExternalLink className="h-3.5 w-auto" />
                                            </Link>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </FadeUp>
                    );
                })}
            </div>
        </section>
    );
}

function renderSkeleton() {
    return (
        <section>
            <SectionHeader title="Projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <div key={index}>
                        <Skeleton className="h-40 w-full" />
                    </div>
                ))}
            </div>
        </section>
    );
}
