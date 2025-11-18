"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "../../shadcn/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../shadcn/collapsible";
import Link from "next/link";
import { useSidebarNav } from "./SidebarNavContext";
export function NavMain() {
    const { navItems } = useSidebarNav();
    if (!navItems || navItems.length === 0) {
        return null;
    }
    return (_jsx(SidebarGroup, { children: _jsx(SidebarMenu, { children: navItems.map((item) => item.items && item.items.length > 0 ? (_jsx(Collapsible, { asChild: true, defaultOpen: item.isActive, className: "group/collapsible", children: _jsxs(SidebarMenuItem, { children: [_jsx(CollapsibleTrigger, { asChild: true, children: _jsxs(SidebarMenuButton, { tooltip: item.title, children: [item.icon && _jsx(item.icon, {}), _jsx("span", { children: item.title }), _jsx(ChevronRight, { className: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })] }) }), _jsx(CollapsibleContent, { children: _jsx(SidebarMenuSub, { children: item.items.map((subItem) => (_jsx(SidebarMenuSubItem, { children: _jsx(SidebarMenuSubButton, { asChild: true, children: _jsx(Link, { href: subItem.url, children: _jsx("span", { children: subItem.title }) }) }) }, subItem.title))) }) })] }) }, item.title)) : (_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { asChild: true, tooltip: item.title, children: _jsxs(Link, { href: item.url, className: "flex items-center gap-2 w-full", children: [item.icon && _jsx(item.icon, {}), _jsx("span", { children: item.title })] }) }) }, item.title))) }) }));
}
// Helper component to set nav items from pages
export function RenderSidebarNav({ items }) {
    const { setNavItems } = useSidebarNav();
    useEffect(() => {
        setNavItems(items);
    }, [items, setNavItems]);
    return null;
}
// Helper component to add a single nav item
export function AddSidebarNav({ item }) {
    const { addNavItem } = useSidebarNav();
    useEffect(() => {
        addNavItem(item);
    }, [item, addNavItem]);
    return null;
}
