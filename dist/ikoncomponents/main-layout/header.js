import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppBreadcrumb } from "../app-breadcrumb";
import { ThemeToggleBtn } from "../theme-toggle-btn";
import { Separator } from "../../shadcn/separator";
import { SidebarTrigger } from "../../shadcn/sidebar";
import { Bell, Play } from "lucide-react";
import { IconButtonWithTooltip, IconTextButton } from "../buttons";
import { useSidebarNav } from "./SidebarNavContext";
import Link from "next/link";
export function Header() {
    const { navItems } = useSidebarNav();
    return (_jsx("header", { className: "ml-12 flex h-12 border-b shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12", children: _jsxs("div", { className: "flex items-center justify-between gap-2 px-4 w-full", children: [_jsxs("div", { className: "flex items-center gap-2", children: [(!navItems || navItems.length === 0) ? _jsx("div", {}) : _jsx(SidebarTrigger, { className: "-ml-1" }), (!navItems || navItems.length === 0) ?
                            _jsx("div", {}) :
                            _jsx(Separator, { orientation: "vertical", className: "mr-2 data-[orientation=vertical]:h-4" }), _jsx(AppBreadcrumb, {})] }), _jsxs("div", { className: "ml-auto flex gap-4", children: [_jsx(IconButtonWithTooltip, { className: "px-2!", tooltipContent: "Notifications", children: _jsx(Bell, {}) }), _jsx(ThemeToggleBtn, {}), _jsx(Link, { href: "/app-store", children: _jsxs(IconTextButton, { variant: "default", children: [_jsx(Play, {}), "App Store"] }) })] })] }) }));
}
