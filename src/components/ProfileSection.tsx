import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EnvelopeClosedIcon, SewingPinIcon, GitHubLogoIcon, LinkedInLogoIcon, ExternalLinkIcon, GlobeIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { getProfile } from "@/lib/data"
import { FadeUp } from "./FadeUp"
import StaggeredName from "./StaggeredName"
import MagneticHover from "./MagneticHover"
import { HeroWireframe } from "./ClientProviders"

function formatDate(dateString: string, locale: string = "en-GB", short: boolean = true): string {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale, {
        year: "numeric",
        month: short ? "short" : "long",
    })
}

export default async function ProfileSection() {
    const raw = await getProfile()
    if (!raw) return null

    const profile = {
        ...raw,
        birthday: raw.birthday ? formatDate(raw.birthday, "en-GB") : raw.birthday,
    }

    const nameParts = profile.name.split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    return (
        <section className="min-h-screen flex flex-col justify-center px-4 md:px-8 py-20 relative">
            <HeroWireframe />

            {/* Background decorative number */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-heading font-bold text-muted opacity-10 select-none pointer-events-none uppercase tracking-tighter"
                aria-hidden="true"
            >
                OP
            </div>

            <div className="max-w-[95vw] mx-auto w-full relative z-10">
                <FadeUp>
                    {/* Top bar: location + email */}
                    <div className="flex flex-wrap items-center gap-4 mb-8 text-sm md:text-base uppercase tracking-widest text-muted-foreground">
                        {profile.location && (
                            <div className="flex items-center gap-2">
                                <SewingPinIcon width={14} height={14} />
                                <span>
                                    {profile.location.city}, {profile.location.country}
                                </span>
                            </div>
                        )}
                        {profile.email && (
                            <div className="flex items-center gap-2">
                                <EnvelopeClosedIcon width={14} height={14} />
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="hover:text-accent transition-colors"
                                >
                                    {profile.email}
                                </a>
                            </div>
                        )}
                    </div>
                </FadeUp>

                {/* Hero name + Avatar */}
                <StaggeredName firstName={firstName} lastName={lastName} />

                <FadeUp>
                    <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12 mb-12">
                        <Avatar className="h-24 w-24 md:h-48 md:w-48 shrink-0 border-2 border-border overflow-hidden">
                            {profile.image ? (
                                <AvatarImage
                                    className="object-cover"
                                    src={profile.image}
                                    alt={profile.name}
                                    loading="eager"
                                />
                            ) : (
                                <AvatarFallback className="text-4xl font-heading font-bold uppercase">
                                    {profile.name
                                        .split(" ")
                                        .map((w: string) => w[0])
                                        .join("")}
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                </FadeUp>

                {/* Bio + Links */}
                <FadeUp delay={0.2}>
                    <div className="space-y-6 max-w-2xl">
                        {profile.bio && (
                            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-tight">
                                {profile.bio}
                            </p>
                        )}

                        {/* Links */}
                        {profile.links.length > 0 && (
                            <div className="flex gap-3 flex-wrap">
                                {profile.links.map((link: any, index: number) => {
                                    let Icon
                                    switch (link.type.toLowerCase()) {
                                        case "website":
                                            Icon = GlobeIcon
                                            break
                                        case "github":
                                            Icon = GitHubLogoIcon
                                            break
                                        case "linkedin":
                                            Icon = LinkedInLogoIcon
                                            break
                                        default:
                                            Icon = ExternalLinkIcon
                                            break
                                    }
                                    return (
                                        <MagneticHover key={index} strength={0.2}>
                                            <Link
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center gap-2 border-2 border-border px-4 py-2 text-sm uppercase tracking-wider hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-200"
                                            >
                                                <Icon width={20} height={20} />
                                                <span>{link.name}</span>
                                            </Link>
                                        </MagneticHover>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </FadeUp>
            </div>
        </section>
    )
}
