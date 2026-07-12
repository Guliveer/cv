import cfg from "@/../config.json"
import Link from "next/link"
import SectionHeader from "./SectionHeader"
import { GitHubLogoIcon, ExternalLinkIcon, StarIcon } from "@radix-ui/react-icons"
import { getProjects } from "@/lib/data"
import { enrichProjects } from "@/lib/utils"
import { FadeUp } from "./FadeUp"

export default async function ProjectsSection() {
    const projects = await getProjects()
    if (!projects) return null

    const projectsList = await enrichProjects(projects, cfg.sortProjects)

    return renderProjects(projectsList)
}

function renderProjects(data: any[]) {
    return (
        <section>
            <SectionHeader title="Projects" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {data.map((project, index) => {
                    const match = project.github?.match(
                        /github\.com\/([^/]+)\/([^/]+)/
                    )
                    const repoPath = match ? `${match[1]}/${match[2]}` : null

                    return (
                        <FadeUp key={index} delay={index * 0.05}>
                            <div className="group bg-background p-6 md:p-8 h-full flex flex-col hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                                        {project.title}
                                    </p>
                                    <div className="flex items-center gap-2 shrink-0 ml-2">
                                        {cfg.showStargazersCount &&
                                            project.stars > 0 && (
                                                <span className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-accent-foreground/70">
                                                     <StarIcon className="h-3 w-auto" />
                                                    <span>{project.stars}</span>
                                                </span>
                                            )}
                                        {project.github && (
                                             <GitHubLogoIcon className="h-5 w-5 text-muted-foreground group-hover:text-accent-foreground transition-colors duration-200" />
                                        )}
                                    </div>
                                </div>

                                {project.description && (
                                    <p className="text-muted-foreground group-hover:text-accent-foreground/70 leading-relaxed">
                                        {project.description}
                                    </p>
                                )}

                                {project.technologies && (
                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        {project.technologies.map(
                                            (tech: string, techIndex: number) => (
                                                <span
                                                    key={techIndex}
                                                    className="text-xs border border-border group-hover:border-accent-foreground/30 px-2 py-0.5 uppercase tracking-wider text-muted-foreground group-hover:text-accent-foreground/70"
                                                >
                                                    {tech}
                                                </span>
                                            )
                                        )}
                                    </div>
                                )}

                                {repoPath && (
                                    <div className="mt-auto pt-4">
                                        <Link
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-accent group-hover:text-background transition-colors"
                                        >
                                            {repoPath}
                                             <ExternalLinkIcon className="h-3.5 w-auto" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </FadeUp>
                    )
                })}
            </div>
        </section>
    )
}
