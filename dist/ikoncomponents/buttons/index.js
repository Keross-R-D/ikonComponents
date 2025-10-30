var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { TooltipComponent as Tooltip } from "../tooltip";
import { Button } from "../../shadcn/button";
export function TextButton(_a) {
    var { children, variant, asChild = false, size } = _a, props = __rest(_a, ["children", "variant", "asChild", "size"]);
    return (_jsx(Button, Object.assign({ variant: variant, size: size }, props, { asChild: asChild, children: children })));
}
export function TextButtonWithTooltip(_a) {
    var { children, variant, asChild = false, size, tooltipContent } = _a, props = __rest(_a, ["children", "variant", "asChild", "size", "tooltipContent"]);
    return (_jsx(Tooltip, { tooltipContent: tooltipContent, children: _jsx(TextButton, Object.assign({ variant: variant, size: size }, props, { asChild: asChild, children: children })) }));
}
export function IconTextButton(_a) {
    var { children, variant, asChild = false, size } = _a, props = __rest(_a, ["children", "variant", "asChild", "size"]);
    return (_jsx(Button, Object.assign({ variant: variant || "outline", size: size || "sm" }, props, { asChild: asChild, children: children })));
}
export function IconTextButtonWithTooltip(_a) {
    var { children, variant, size, asChild = false, tooltipContent } = _a, props = __rest(_a, ["children", "variant", "size", "asChild", "tooltipContent"]);
    return (_jsx(Tooltip, { tooltipContent: tooltipContent, children: _jsx(IconTextButton, Object.assign({ variant: variant, size: size }, props, { asChild: asChild, children: children })) }));
}
export function IconButton(_a) {
    var { children, variant, size, asChild = false } = _a, props = __rest(_a, ["children", "variant", "size", "asChild"]);
    return (_jsx(Button, Object.assign({ variant: variant || "outline", size: size || "icon" }, props, { asChild: asChild, children: children })));
}
export function IconButtonWithTooltip(_a) {
    var { children, tooltipContent, asChild = false, variant, size } = _a, props = __rest(_a, ["children", "tooltipContent", "asChild", "variant", "size"]);
    return (_jsx(Tooltip, { tooltipContent: tooltipContent, children: _jsx(IconButton, Object.assign({ variant: variant, size: size }, props, { asChild: asChild, children: children })) }));
}
