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
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../utils/cn";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-xs hover:bg-[var(--accent)]/60",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border! border-2! bg-background shadow-xs hover:bg-accent hover:text-accent-foreground ",
            secondary: "bg-[var(--btn-secondary)] text-secondary-foreground shadow-xs hover:bg-[var(--btn-secondary)]/20 border border-input",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            dashed: "border border-dashed bg-background shadow-sm hover:bg-accent hover:text-accent-foreground ",
            link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9",
            smIcon: "h-8 w-8",
            circular: "size-10 rounded-full p-0",
            lgIcon: "size-10",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
function Button(_a) {
    var { className, variant, size, asChild = false } = _a, props = __rest(_a, ["className", "variant", "size", "asChild"]);
    const Comp = asChild ? Slot : "button";
    return (_jsx(Comp, Object.assign({ "data-slot": "button", className: cn(buttonVariants({ variant, size, className })) }, props)));
}
export { Button, buttonVariants };
