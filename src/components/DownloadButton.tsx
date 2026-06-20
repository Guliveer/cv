"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DownloadButton() {
    return (
        <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => window.open("/print", "_blank")}
            aria-label="Download CV as PDF"
        >
            <Download className="h-[1.2rem] w-[1.2rem]" />
        </Button>
    )
}
