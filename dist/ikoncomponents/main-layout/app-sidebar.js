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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail, } from "../../shadcn/sidebar";
import { NavMain } from "./nav-main";
import { useSidebarNav } from "./SidebarNavContext";
export function AppSidebar(_a) {
    var props = __rest(_a, []);
    const { navItems } = useSidebarNav();
    if (!navItems || navItems.length === 0) {
        return null;
    }
    return (_jsxs(Sidebar, Object.assign({ className: "ml-12", collapsible: "offcanvas" }, props, { children: [_jsx(SidebarContent, { children: _jsx(NavMain, {}) }), _jsx(SidebarFooter, {}), _jsx(SidebarRail, {})] })));
}
