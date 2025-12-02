import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AlertCustom({ type, title, description, color }: { type: "default" | "destructive" | null | undefined, title: string, description: string, color: string }) {
    return (<Alert variant={type} className={`text-xs border-border-${color}  bg-bg-${color}`}>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="text-xs">
            {description}
        </AlertDescription>
    </Alert>)
}