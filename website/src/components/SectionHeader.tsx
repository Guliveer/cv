"use client"

interface SectionHeaderProps {
    title: string
}

export default function SectionHeader({ title }: SectionHeaderProps) {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight relative inline-block">
                {title}
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/20" />
                <span className="absolute -bottom-1 left-0 w-1/4 max-w-10 h-1 bg-primary" />
            </h2>
        </div>
    )
}
