import DownloadButton from "@/components/DownloadButton"

export function HeaderActions() {
    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 print:hidden">
            <DownloadButton />
        </div>
    )
}
