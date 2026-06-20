"use client"

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

function downloadPageAsPDF() {
    const root = document.documentElement;
    const hiddenEls = document.querySelectorAll(".print\\:hidden");

    hiddenEls.forEach(el => el.classList.add("hidden"));
    root.classList.add("print-mode");
    const style = document.createElement("style");
    style.id = "print-scaling";
    document.head.appendChild(style);

    const cleanup = () => {
        hiddenEls.forEach(el => el.classList.remove("hidden"));
        root.classList.remove("print-mode");
        const existingStyle = document.getElementById("print-scaling");
        if (existingStyle) existingStyle.remove();
        window.removeEventListener("afterprint", cleanup);
    };


    window.addEventListener("afterprint", cleanup);
    window.print();
    cleanup();
}

export default function DownloadButton() {
    return (
        <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={downloadPageAsPDF}
        >
            <Download className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Download CV as PDF</span>
        </Button>
    );
}