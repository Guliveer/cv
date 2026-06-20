import { getProfile, getExperience, getEducation, getProjects } from "@/lib/data"
import { enrichProjects, shortDate } from "@/lib/utils"
import cfg from "@/../config.json"
import PrintTrigger from "./PrintTrigger"

export const revalidate = 3600

// ── Inline SVG icons (no icon library dependency in print route) ──────────

function IconMail() {
    return <svg className="cv-meta-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
}
function IconMapPin() {
    return <svg className="cv-meta-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
}
function IconGithub() {
    return <svg className="cv-meta-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
}
function IconLinkedin() {
    return <svg className="cv-meta-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
}
function IconGlobe() {
    return <svg className="cv-meta-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
}
function IconStar() {
    return <svg style={{width:10,height:10,display:'inline',verticalAlign:'middle',marginRight:2}} viewBox="0 0 24 24" fill="#9ca3af" aria-hidden="true"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
}

function linkIcon(type: string) {
    switch (type.toLowerCase()) {
        case "github":   return <IconGithub />
        case "linkedin": return <IconLinkedin />
        case "website":  return <IconGlobe />
        default:         return <IconGlobe />
    }
}

// ── Helpers ────────────────────────────────────────────────────────────────

function fmt(date: string) {
    return shortDate(date, "en-US")
}

// ── Page ──────────────────────────────────────────────────────────────────

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
            <PrintTrigger />

            <div className="cv-page">

                {/* ── Header ──────────────────────────────────────────── */}
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
                                    <IconMail />
                                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                                </span>
                            )}
                            {profile.location && (
                                <span className="cv-meta-item">
                                    <IconMapPin />
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

                {/* ── Skills + Languages ──────────────────────────────── */}
                <div className="cv-two-col" style={{marginBottom: '1.1rem'}}>
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

                {/* ── Experience ──────────────────────────────────────── */}
                <section className="cv-section">
                    <h2 className="cv-section-title">Experience</h2>
                    {sortedExp.map((exp, i) => (
                        <div key={i} className="cv-entry">
                            <div className="cv-entry-left">
                                <span className="cv-entry-company">{exp.company}</span>
                                {exp.formerlyKnownAs?.length > 0 && (
                                    <div className="cv-entry-formerly">
                                        formerly {exp.formerlyKnownAs.join(' → ')}
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

                {/* ── Education ───────────────────────────────────────── */}
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

                {/* ── Projects ────────────────────────────────────────── */}
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
                            // Cap at 6 technologies to keep cards compact
                            const techs = (project.technologies ?? []).slice(0, 6)
                            const extraCount = (project.technologies?.length ?? 0) - techs.length
                            return (
                                <div key={i} className="cv-project">
                                    <span className="cv-project-title">{project.title}</span>
                                    {project.stars > 0 && (
                                        <span className="cv-project-stars">
                                            <IconStar />{project.stars}
                                        </span>
                                    )}
                                    {(repoPath || desc) && (
                                        <div className="cv-project-meta">
                                            {repoPath && (
                                                <a href={project.github} className="cv-project-url" target="_blank" rel="noreferrer">
                                                    {repoPath}
                                                </a>
                                            )}
                                            {desc && (
                                                <span className="cv-project-desc">— {desc}</span>
                                            )}
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
