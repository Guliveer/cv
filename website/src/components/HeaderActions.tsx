import { ThemeToggle } from "./ThemeToggle"

export function HeaderActions() {
    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 print-hidden">
            <ThemeToggle />
        </div>
    )
}
