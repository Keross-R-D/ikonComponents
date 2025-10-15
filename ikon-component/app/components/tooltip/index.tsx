import { TooltipProvider } from "@/app/shadcn/ui/tooltip";
import { Tooltip as TooltipComp, TooltipTrigger, TooltipContent } from "@/app/shadcn/ui/tooltip";

export function Tooltip({ tooltipContent, children }: { tooltipContent: string | React.ReactNode, children: React.ReactNode }) {
    return (
        <TooltipProvider>
            <TooltipComp>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    {tooltipContent}
                </TooltipContent>
            </TooltipComp>
        </TooltipProvider>
    );
}