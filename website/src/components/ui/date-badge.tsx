import { Badge } from '@/components/ui/badge'

export function DateBadge({startDate, endDate}: {startDate: string | Date, endDate: string | Date}) {
    return (
        <Badge variant="outline" className="text-sm">
            {startDate instanceof Date ? startDate.toLocaleDateString() : startDate} — {endDate instanceof Date ? endDate.toLocaleDateString() : endDate ? endDate : "Present"}
        </Badge>
    )
}