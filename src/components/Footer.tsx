"use client"

import Marquee from "react-fast-marquee"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export function Footer() {
    return (
        <footer className="print:hidden mt-32">
            <div className="border-t-2 border-border">
                <Marquee speed={60} autoFill>
                    <span className="text-[clamp(3rem,8vw,8rem)] font-heading font-bold uppercase tracking-tighter px-8 text-muted-foreground opacity-40">
                        OLIWER PAWELSKI
                    </span>
                    <span className="text-[clamp(3rem,8vw,8rem)] font-heading font-bold uppercase tracking-tighter px-8 text-muted-foreground opacity-40">
                        ///
                    </span>
                </Marquee>
            </div>

            <div className="max-w-[95vw] mx-auto py-8 px-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t-2 border-border">
                <p className="text-sm text-muted-foreground uppercase tracking-widest">
                    DESIGNED & BUILT BY{" "}
                    <span className="text-accent font-bold">OLIWER PAWELSKI</span>
                </p>
                <a
                    href="https://github.com/Guliveer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors uppercase tracking-wider"
                >
                    <GitHubLogoIcon width={24} height={24} className="inline-block" />
                    <span>GITHUB.COM/GULIVEER</span>
                </a>
            </div>
        </footer>
    )
}
