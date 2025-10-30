import * as React from "react";
import { Tooltip as TooltipComp, TooltipContent, TooltipProvider, TooltipTrigger } from "../../shadcn/tooltip";

export function TooltipComponent({ tooltipContent, children }: { tooltipContent: string | React.ReactNode, children: React.ReactNode }) {
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