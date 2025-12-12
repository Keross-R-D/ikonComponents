"use client";
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
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "../utils/cn";
import { toggleVariants } from "./toggle";
const ToggleGroupContext = React.createContext({
    size: "default",
    variant: "default",
    spacing: 0,
});
function ToggleGroup(_a) {
    var { className, variant, size, spacing = 0, children } = _a, props = __rest(_a, ["className", "variant", "size", "spacing", "children"]);
    return (_jsx(ToggleGroupPrimitive.Root, Object.assign({ "data-slot": "toggle-group", "data-variant": variant, "data-size": size, "data-spacing": spacing, style: { "--gap": spacing }, className: cn("group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs", className) }, props, { children: _jsx(ToggleGroupContext.Provider, { value: { variant, size, spacing }, children: children }) })));
}
function ToggleGroupItem(_a) {
    var { className, children, variant, size } = _a, props = __rest(_a, ["className", "children", "variant", "size"]);
    const context = React.useContext(ToggleGroupContext);
    return (_jsx(ToggleGroupPrimitive.Item, Object.assign({ "data-slot": "toggle-group-item", "data-variant": context.variant || variant, "data-size": context.size || size, "data-spacing": context.spacing, className: cn(toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
        }), "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10", "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l", className) }, props, { children: children })));
}
export { ToggleGroup, ToggleGroupItem };
