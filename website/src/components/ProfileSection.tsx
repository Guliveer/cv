import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Mail, Languages, Award, MapPin, MessageCircle } from "lucide-react"
import { Globe, Github, Linkedin, ExternalLink } from "lucide-react"
import Link from "next/link"
import SectionHeader from "./SectionHeader"
import { urlFor } from "@/lib/sanity"
import { getProfile } from "@/lib/queries";

// Cache object
const profileCache: { data: any; expiry: number } = { data: null, expiry: 0 };

export default async function ProfileSection() {
    // Check if the cache is valid
    if (profileCache.data && profileCache.expiry > Date.now()) {
        return renderSection(profileCache.data);
    }

    const profile = await getProfile();
    if (!profile) return renderSkeleton();

    // Sort skills alphabetically
    profile.skills = profile.skills.sort((a: string, b: string) => a.localeCompare(b));

    // Remove duplicates from skills
    profile.skills = [...new Set(profile.skills)];

    // Update cache
    profileCache.data = profile;
    profileCache.expiry = Date.now() + 10 * 60 * 1000; // Cache for 10 minutes

    return renderSection(profile);
}

function renderSection(data: any) {
    return (
        <section>
            <SectionHeader title="Profile" />

            <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                {/* General */}
                <div className="flex flex-col items-center gap-4">
                    {/* Avatar */}
                    <Avatar className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-primary/20 shadow-lg">
                        {data.image ? (
                            <AvatarImage
                                src={urlFor(data.image).width(400).height(400).url()}
                                alt={data.name}
                            />
                        ) : (
                            <AvatarFallback>{data.name.slice(0, 2)}</AvatarFallback>
                        )}
                    </Avatar>

                    <div className="space-y-2 text-center">
                        {/* Name */}
                        <h1 className="text-3xl font-bold">{data.name}</h1>

                        {/* Email */}
                        <div className="flex items-center justify-center gap-2 opacity-80">
                            <Mail size={16} />
                            <a href={`mailto:${data.email}`} className="hover:underline">
                                {data.email}
                            </a>
                        </div>

                        {/* Location */}
                        {data.location && (
                            <div className="flex items-center justify-center gap-2 opacity-80">
                                <MapPin size={16} />
                                <span>{data.location.city}, {data.location.country}</span>
                            </div>
                        )}
                    </div>

                    {/* Links */}
                    {data.links.length > 0 && (
                        <div className="flex gap-2">
                            {data.links.map((link: any, index: number) => {
                                let Icon;

                                switch(link.type.toLowerCase()) {
                                    case "website":
                                        Icon = Globe
                                        break;
                                    case "github":
                                        Icon = Github
                                        break;
                                    case "linkedin":
                                        Icon = Linkedin
                                        break;
                                    default:
                                        Icon = ExternalLink
                                        break;
                                }

                                return (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        className="inline-flex items-center hover:border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
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
                </div>

                {/* Details */}
                <div className="space-y-6">
                    {/* Bio / About */}
                    {data.bio && (
                        <div>
                            <h2 className="flex items-center text-2xl font-semibold mb-2">
                                <MessageCircle className="h-6 w-6 mr-2 text-primary" />
                                <span>About</span>
                            </h2>
                            <p>{data.bio}</p>
                        </div>
                    )}

                    {/* Skills */}
                    <div>
                        <h2 className="flex items-center text-2xl font-semibold mb-2">
                            <Award className="h-6 w-6 mr-2 text-primary" />
                            <span>Skills</span>
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill: string, index: number) => (
                                <Badge key={index} variant="outline" className="tracking-widest cursor-default">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Languages */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-2 flex items-center">
                            <Languages className="h-6 w-6 mr-2 text-primary" />
                            <span>Languages</span>
                        </h2>
                        <div className="flex flex-col gap-1">
                            {data.languages.map((language: any, index: number) => (
                                <div key={index} className="flex items-center gap-2">
                                    {language.name}
                                    <Badge variant="secondary" className="cursor-default">
                                        {language.prof}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>
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

                    {/* Avatar */}
                    <Skeleton className="h-48 w-48 rounded-full" />

                    <div className="space-y-2 flex flex-col content-center gap-1">
                        {/* Name */}
                        <Skeleton className="h-10 w-48" />
                        {/* Email */}
                        <Skeleton className="h-4 w-48" />
                        {/* Location */}
                        <Skeleton className="h-4 w-48" />
                    </div>

                    {/* Links */}
                    <div className="flex gap-2">
                        <Skeleton className="h-10 w-10 rounded-md" />
                        <Skeleton className="h-10 w-10 rounded-md" />
                        <Skeleton className="h-10 w-10 rounded-md" />
                    </div>
                </div>
                <div className="space-y-6">

                    {/* About */}
                    <Skeleton className="h-10 w-64" />
                    <div className="flex flex-col gap-3 w-full">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-1/4" />
                    </div>

                    {/* Skills */}
                    <Skeleton className="h-10 w-64" />
                    <div className="flex gap-2 w-full">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-32" />
                    </div>

                    {/* Languages */}
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
