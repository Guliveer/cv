import DownloadButton from "@/components/DownloadButton";
import ThemeToggle from "@/components/ThemeToggle"

export function HeaderActions() {
    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 print:hidden">
            <DownloadButton />
            <ThemeToggle />
        </div>
    )
}