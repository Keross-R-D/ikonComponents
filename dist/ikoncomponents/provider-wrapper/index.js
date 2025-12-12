"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { ThemeProvider } from "../../utils/theme-provider";
import { FontProvider } from "../../utils/font-provider";
import { RadiusProvider } from "../../utils/border-radius-provider";
import { BreadcrumbProvider } from "../app-breadcrumb/BreadcrumbProvider";
import { MainLayout } from "../main-layout";
export function ProviderWrapper({ children, baseUrl }) {
    return (_jsx(ThemeProvider, { attribute: "class", defaultTheme: "system", enableSystem: true, children: _jsx(FontProvider, { children: _jsx(RadiusProvider, { children: _jsx(BreadcrumbProvider, { children: _jsx(MainLayout, { baseUrl: baseUrl, children: children }) }) }) }) }));
}
