import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Mail, Languages, Award, MapPin, Cake, MessageCircle } from "lucide-react"
import { Globe, Github, Linkedin, ExternalLink } from "lucide-react"
import Link from "next/link"
import SectionHeader from "./SectionHeader"
import { FadeUp } from "./FadeUp"
import { getProfile } from "@/lib/data";

function formatDate(dateString: string, locale: string = "en-GB", short: boolean = true): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
        year: "numeric",
        month: short ? "short" : "long",
    });
}

export default async function ProfileSection() {
    const raw = await getProfile();
    if (!raw) return renderSkeleton();

    const profile = {
        ...raw,
        skills: [...new Set(raw.skills)].sort((a, b) => a.localeCompare(b)),
        birthday: raw.birthday ? formatDate(raw.birthday, "en-GB") : raw.birthday,
    };

    return renderSection(profile);
}

function renderSection(data: any) {
    return (
        <section>
            <SectionHeader title="Profile" />

            <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                {/* General */}
                <FadeUp className="flex flex-col items-center gap-4">
                    {/* Avatar */}
                    <Avatar className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-primary/30 shadow-xl ring-4 ring-primary/10 ring-offset-2 ring-offset-background transition-all duration-300 hover:ring-primary/30">
                        {data.image ? (
                            <AvatarImage
                                className="object-cover"
                                src={data.image}
                                alt={data.name}
                                loading="eager"
                            />
                        ) : (
                            <AvatarFallback>{data.name.slice(0, 2)}</AvatarFallback>
                        )}
                    </Avatar>

                    <div className="space-y-2 text-center">
                        {/* Name */}
                        <h1 className="text-3xl font-bold">{data.name}</h1>

                        {/* Email */}
                        {data.email && (
                            <div className="flex items-center justify-center gap-2 opacity-80 transition-opacity hover:opacity-100">
                                <Mail size={16} />
                                <a href={`mailto:${data.email}`} className="hover:underline">
                                    {data.email}
                                </a>
                            </div>
                        )}

                        {/* Location */}
                        {data.location && (
                            <div className="flex items-center justify-center gap-2 opacity-80">
                                <MapPin size={16} />
                                <span>{data.location.city}, {data.location.country}</span>
                            </div>
                        )}

                        {/* Birthday */}
                        {data.birthday && (
                            <div className="flex items-center justify-center gap-2 opacity-80">
                                <Cake size={16} />
                                <span>{data.birthday}</span>
                            </div>
                        )}
                    </div>

                    {/* Links */}
                    {data.links.length > 0 && (
                        <div className="flex gap-2 flex-wrap justify-center">
                            {data.links.map((link: any, index: number) => {
                                let Icon;
                                switch(link.type.toLowerCase()) {
                                    case "website": Icon = Globe; break;
                                    case "github":  Icon = Github; break;
                                    case "linkedin": Icon = Linkedin; break;
                                    default: Icon = ExternalLink; break;
                                }
                                return (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        className="inline-flex items-center hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5 transition-all duration-200"
                                        asChild
                                    >
                                        <Link href={link.url} target="_blank" rel="noopener noreferrer">
                                            <Icon size={18} />
                                            {link.name}
                                        </Link>
                                    </Button>
                                )
                            })}
                        </div>
                    )}
                </FadeUp>

                {/* Details */}
                <div className="space-y-6">
                    {/* Bio / About */}
                    {data.bio && (
                        <FadeUp delay={0.1}>
                            <h2 className="flex items-center text-2xl font-semibold mb-2">
                                <MessageCircle className="h-6 w-6 mr-2 text-primary" />
                                <span>About</span>
                            </h2>
                            <p className="whitespace-pre-line leading-relaxed">{data.bio}</p>
                        </FadeUp>
                    )}

                    {/* Skills */}
                    <FadeUp delay={0.15}>
                        <h2 className="flex items-center text-2xl font-semibold mb-3">
                            <Award className="h-6 w-6 mr-2 text-primary" />
                            <span>Skills</span>
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill: string, index: number) => (
                                <Badge
                                    key={index}
                                    variant="outline"
                                    className="cursor-default transition-all duration-150 hover:scale-105 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </FadeUp>

                    {/* Languages */}
                    <FadeUp delay={0.2}>
                        <h2 className="text-2xl font-semibold mb-2 flex items-center">
                            <Languages className="h-6 w-6 mr-2 text-primary" />
                            <span>Languages</span>
                        </h2>
                        <div className="flex flex-col gap-1.5">
                            {data.languages.map((language: any, index: number) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span>{language.name}</span>
                                    <Badge variant="secondary" className="cursor-default">
                                        {language.proficiency}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </FadeUp>
                </div>
            </div>
        </section>
    );
}

function renderSkeleton() {
    return (
        <section>
            <SectionHeader title="Profile" />
            <div className="grid gap-6 md:grid-cols-[1fr_2fr] select-none cursor-default">
                <div className="flex flex-col items-center content-center gap-4">
                    <Skeleton className="h-48 w-48 rounded-full" />
                    <div className="space-y-2 flex flex-col content-center gap-1">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="h-10 w-24 rounded-md" />
                        <Skeleton className="h-10 w-24 rounded-md" />
                    </div>
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-10 w-64" />
                    <div className="flex flex-col gap-3 w-full">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-1/4" />
                    </div>
                    <Skeleton className="h-10 w-64" />
                    <div className="flex gap-2 w-full flex-wrap">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-10 w-64" />
                    <div className="flex flex-col gap-3 w-32">
                        <Skeleton className="h-5" />
                        <Skeleton className="h-5" />
                    </div>
                </div>
            </div>
        </section>
    );
}
