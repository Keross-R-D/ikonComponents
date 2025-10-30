import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tooltip as TooltipComp, TooltipContent, TooltipProvider, TooltipTrigger } from "../../shadcn/tooltip";
export function TooltipComponent({ tooltipContent, children }) {
    return (_jsx(TooltipProvider, { children: _jsxs(TooltipComp, { children: [_jsx(TooltipTrigger, { asChild: true, children: children }), _jsx(TooltipContent, { children: tooltipContent })] }) }));
}
