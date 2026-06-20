"use client"

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

function printCV() {
    const html = document.documentElement;

    // Framer Motion animates elements to opacity:0/translateY before they enter
    // the viewport — force them all visible before printing
    const motionEls = document.querySelectorAll<HTMLElement>("[style*='opacity'], [style*='transform']");
    const savedStyles: Array<{ el: HTMLElement; opacity: string; transform: string }> = [];

    motionEls.forEach(el => {
        savedStyles.push({ el, opacity: el.style.opacity, transform: el.style.transform });
        el.style.opacity = "1";
        el.style.transform = "none";
    });

    // Temporarily strip dark mode so print CSS gets light-mode variables
    const wasDark = html.classList.contains("dark");
    if (wasDark) html.classList.remove("dark");

    const cleanup = () => {
        savedStyles.forEach(({ el, opacity, transform }) => {
            el.style.opacity = opacity;
            el.style.transform = transform;
        });
        if (wasDark) html.classList.add("dark");
        window.removeEventListener("afterprint", cleanup);
    };

    window.addEventListener("afterprint", cleanup);
    window.print();

    // afterprint doesn't fire reliably in all browsers — fallback timeout
    setTimeout(cleanup, 1000);
}

export default function DownloadButton() {
    return (
        <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={printCV}
        >
            <Download className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Download CV as PDF</span>
        </Button>
    );
}
