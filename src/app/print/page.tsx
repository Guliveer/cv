import { getProfile, getExperience, getEducation, getProjects } from "@/lib/data"
import { enrichProjects, shortDate } from "@/lib/utils"
import cfg from "@/../config.json"
import PrintTrigger from "./PrintTrigger"
import { Suspense } from "react"
import { EnvelopeClosedIcon, SewingPinIcon, GitHubLogoIcon, LinkedInLogoIcon, GlobeIcon, Link1Icon, StarIcon } from "@radix-ui/react-icons"

export const revalidate = 3600

function linkIcon(type: string) {
    const cls = "cv-meta-icon"
    switch (type.toLowerCase()) {
        case "github":   return <GitHubLogoIcon className={cls} />
        case "linkedin": return <LinkedInLogoIcon className={cls} />
        case "website":  return <GlobeIcon className={cls} />
        default:         return <GlobeIcon className={cls} />
    }
}

function fmt(date: string) {
    return shortDate(date, "en-US")
}

export default async function PrintPage() {
    const [profile, experiences, education, rawProjects] = await Promise.all([
        Promise.resolve(getProfile()),
        Promise.resolve(getExperience()),
        Promise.resolve(getEducation()),
        Promise.resolve(getProjects()),
    ])

    const projects = await enrichProjects(rawProjects, cfg.sortProjects)

    const sortedExp = [...experiences].sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
    const sortedEdu = [...education].sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )

    return (
        <>
            <Suspense>
                <PrintTrigger />
            </Suspense>

            <div className="cv-page">

                <header className="cv-header">
                    {profile.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={profile.image}
                            alt={profile.name}
                            className="cv-avatar"
                        />
                    )}

                    <div className="cv-header-details">
                        <h1 className="cv-name">{profile.name}</h1>

                        <div className="cv-meta">
                            {profile.email && (
                                <span className="cv-meta-item">
                                    <EnvelopeClosedIcon className="cv-meta-icon" />
                                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                                </span>
                            )}
                            {profile.location && (
                                <span className="cv-meta-item">
                                    <SewingPinIcon className="cv-meta-icon" />
                                    {profile.location.city}, {profile.location.country}
                                </span>
                            )}
                            {profile.links.map((link, i) => (
                                <span key={i} className="cv-meta-item">
                                    {linkIcon(link.type)}
                                    <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                                </span>
                            ))}
                        </div>

                        {profile.bio && (
                            <p className="cv-bio">{profile.bio}</p>
                        )}
                    </div>
                </header>

                <div className="cv-two-col" style={{marginBottom: '0.6rem'}}>
                    <section className="cv-section" style={{marginBottom: 0}}>
                        <h2 className="cv-section-title">Skills</h2>
                        <div className="cv-chips">
                            {[...new Set(profile.skills)].sort((a, b) => a.localeCompare(b)).map((skill, i) => (
                                <span key={i} className="cv-chip">{skill}</span>
                            ))}
                        </div>
                    </section>

                    <section className="cv-section" style={{marginBottom: 0}}>
                        <h2 className="cv-section-title">Languages</h2>
                        {profile.languages.map((lang, i) => (
                            <div key={i} className="cv-lang-row">
                                <span className="cv-lang-name">{lang.name}</span>
                                <span className="cv-lang-level">{lang.proficiency}</span>
                            </div>
                        ))}
                    </section>
                </div>

                <section className="cv-section">
                    <h2 className="cv-section-title">Experience</h2>
                    {sortedExp.map((exp, i) => (
                        <div key={i} className="cv-entry">
                            <div className="cv-entry-left">
                                <span className="cv-entry-company">{exp.company}</span>
                                {exp.formerlyKnownAs && exp.formerlyKnownAs.length > 0 && (
                                    <div className="cv-entry-formerly">
                                        formerly {exp.formerlyKnownAs!.join(' → ')}
                                    </div>
                                )}
                                <div className="cv-entry-position">
                                    {exp.position}
                                    {!exp.endDate && (
                                        <span className="cv-entry-badge-current">Current</span>
                                    )}
                                </div>
                            </div>
                            <div className="cv-entry-dates">
                                {fmt(exp.startDate)} — {exp.endDate ? fmt(exp.endDate) : 'Present'}
                            </div>
                            {exp.description && (
                                <p className="cv-entry-desc">{exp.description}</p>
                            )}
                        </div>
                    ))}
                </section>

                <section className="cv-section">
                    <h2 className="cv-section-title">Education</h2>
                    {sortedEdu.map((edu, i) => (
                        <div key={i} className="cv-entry">
                            <div className="cv-entry-left">
                                <span className="cv-entry-school">{edu.school}</span>
                                <div className="cv-entry-field">
                                    {edu.field}
                                    {edu.degree && (
                                        <span className="cv-entry-degree">{edu.degree}</span>
                                    )}
                                </div>
                            </div>
                            <div className="cv-entry-dates">
                                {fmt(edu.startDate)} — {edu.endDate ? fmt(edu.endDate) : 'Present'}
                            </div>
                            {edu.description && (
                                <p className="cv-entry-desc">{edu.description}</p>
                            )}
                        </div>
                    ))}
                </section>

                <section className="cv-section">
                    <h2 className="cv-section-title">Projects</h2>
                    <div className="cv-projects">
                        {projects.map((project, i) => {
                            const match = project.github?.match(/github\.com\/([^/]+)\/([^/]+)/)
                            const repoPath = match ? `${match[1]}/${match[2]}` : null
                            const desc = project.description
                                ? project.description.length > 72
                                    ? project.description.substring(0, 72).trimEnd() + '…'
                                    : project.description
                                : null
                            const techs = (project.technologies ?? []).slice(0, 6)
                            const extraCount = (project.technologies?.length ?? 0) - techs.length
                            return (
                                <div key={i} className="cv-project">
                                    <div className="cv-project-header">
                                        <span className="cv-project-title">{project.title}</span>
                                        {repoPath && (
                                            <a href={project.github} className="cv-project-url" target="_blank" rel="noreferrer">
                                                {repoPath} <Link1Icon className="cv-project-url-icon" />
                                            </a>
                                        )}
                                        {project.stars > 0 && (
                                            <span className="cv-project-stars">
                                                <StarIcon className="cv-project-star-icon" />{project.stars}
                                            </span>
                                        )}
                                    </div>
                                    {desc && (
                                        <div className="cv-project-meta">
                                            <span className="cv-project-desc">{desc}</span>
                                        </div>
                                    )}
                                    {techs.length > 0 && (
                                        <div className="cv-project-chips">
                                            {techs.map((tech: string, ti: number) => (
                                                <span key={ti} className="cv-chip cv-chip-accent">{tech}</span>
                                            ))}
                                            {extraCount > 0 && (
                                                <span className="cv-chip" style={{color:'#9ca3af', borderColor:'#e5e7eb'}}>+{extraCount}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </section>

            </div>
        </>
    )
}
