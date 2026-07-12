"use client"

import { DownloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

export default function DownloadButton() {
    return (
        <Button
            variant="outline"
            size="icon"
            className="rounded-none"
            onClick={() => window.open("/print", "_blank")}
            aria-label="Download CV as PDF"
        >
            <DownloadIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
    )
}
