"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from "next-themes";
import { useEffect, useState, useCallback } from "react";
import { Laptop, Moon, Sun, Check, Waves } from "lucide-react";
import { Button } from "../../shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../shadcn/dropdown-menu";
export function ThemeToggleBtn() {
    const { setTheme, theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    const activeTheme = theme === "system" ? resolvedTheme : theme;
    const getLuminance = (hexColor) => {
        const rgb = parseInt(hexColor.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };
    const getContrastColor = (bgColor) => {
        const luminance = getLuminance(bgColor);
        return luminance > 0.25 ? '#000000' : '#ffffff';
    };
    const applySavedColors = useCallback(() => {
        const primaryColor = localStorage.getItem("primary") || '#0f172b';
        const secondaryColor = localStorage.getItem("secondary") || '#1b2336';
        const tertiaryColor = localStorage.getItem("tertiary") || '#010416';
        const pChartColor = localStorage.getItem("primaryChart") || '#00bc7d';
        const sChartColor = localStorage.getItem("secondaryChart") || '#fd9a00';
        const tChartColor = localStorage.getItem("tertiaryChart") || '#ad46ff';
        document.documentElement.style.setProperty('--background', primaryColor);
        document.documentElement.style.setProperty('--secondary', secondaryColor);
        document.documentElement.style.setProperty('--card', secondaryColor);
        document.documentElement.style.setProperty('--popover', secondaryColor);
        document.documentElement.style.setProperty('--muted', secondaryColor);
        document.documentElement.style.setProperty('--sidebar', secondaryColor);
        document.documentElement.style.setProperty('--btn-secondary', secondaryColor);
        document.documentElement.style.setProperty('--accent', tertiaryColor);
        document.documentElement.style.setProperty('--sidebar-primary', tertiaryColor);
        document.documentElement.style.setProperty('--sidebar-accent', tertiaryColor);
        document.documentElement.style.setProperty('--foreground', getContrastColor(primaryColor));
        document.documentElement.style.setProperty('--secondary-foreground', getContrastColor(secondaryColor));
        document.documentElement.style.setProperty('--card-foreground', getContrastColor(secondaryColor));
        document.documentElement.style.setProperty('--popover-foreground', getContrastColor(secondaryColor));
        document.documentElement.style.setProperty('--muted-foreground', getContrastColor(secondaryColor));
        document.documentElement.style.setProperty('--sidebar-foreground', getContrastColor(secondaryColor));
        document.documentElement.style.setProperty('--accent-foreground', getContrastColor(tertiaryColor));
        document.documentElement.style.setProperty('--sidebar-primary-foreground', getContrastColor(tertiaryColor));
        document.documentElement.style.setProperty('--sidebar-accent-foreground', getContrastColor(tertiaryColor));
        document.documentElement.style.setProperty('--chart-1', pChartColor);
        document.documentElement.style.setProperty('--chart-2', sChartColor);
        document.documentElement.style.setProperty('--chart-3', tChartColor);
        document.documentElement.style.setProperty('--chart-4', pChartColor);
        document.documentElement.style.setProperty('--chart-5', sChartColor);
    }, []);
    const resetColors = useCallback(() => {
        document.documentElement.style.removeProperty('--background');
        document.documentElement.style.removeProperty('--secondary');
        document.documentElement.style.removeProperty('--card');
        document.documentElement.style.removeProperty('--popover');
        document.documentElement.style.removeProperty('--muted');
        document.documentElement.style.removeProperty('--sidebar');
        document.documentElement.style.removeProperty('--btn-secondary');
        document.documentElement.style.removeProperty('--accent');
        document.documentElement.style.removeProperty('--sidebar-primary');
        document.documentElement.style.removeProperty('--sidebar-accent');
        document.documentElement.style.removeProperty('--foreground');
        document.documentElement.style.removeProperty('--secondary-foreground');
        document.documentElement.style.removeProperty('--card-foreground');
        document.documentElement.style.removeProperty('--popover-foreground');
        document.documentElement.style.removeProperty('--muted-foreground');
        document.documentElement.style.removeProperty('--sidebar-foreground');
        document.documentElement.style.removeProperty('--accent-foreground');
        document.documentElement.style.removeProperty('--sidebar-primary-foreground');
        document.documentElement.style.removeProperty('--sidebar-accent-foreground');
        document.documentElement.style.removeProperty('--chart-1');
        document.documentElement.style.removeProperty('--chart-2');
        document.documentElement.style.removeProperty('--chart-3');
        document.documentElement.style.removeProperty('--chart-4');
        document.documentElement.style.removeProperty('--chart-5');
    }, []);
    useEffect(() => {
        if (mounted && activeTheme === "blue-dark") {
            document.documentElement.classList.add("blue-dark");
            applySavedColors();
        }
    }, [mounted, activeTheme, applySavedColors]);
    const setThemeSafe = useCallback((value) => {
        setTheme(value);
        if (value === "light" || value === "dark") {
            document.documentElement.classList.remove("blue-dark");
            resetColors();
        }
        if (value === "blue-dark") {
            document.documentElement.classList.add("blue-dark");
            applySavedColors();
        }
    }, [setTheme, applySavedColors, resetColors]);
    if (!mounted)
        return null;
    const triggerIcon = (() => {
        if (activeTheme === "blue-dark")
            return _jsx(Waves, { className: "h-5 w-5" });
        if (activeTheme === "dark")
            return _jsx(Moon, { className: "h-5 w-5" });
        if (activeTheme === "light")
            return _jsx(Sun, { className: "h-5 w-5" });
        return _jsx(Laptop, { className: "h-5 w-5" });
    })();
    const isActive = (value) => activeTheme === value;
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Change theme", title: `Theme: ${theme === "system" ? `system (${resolvedTheme})` : theme}`, children: triggerIcon }) }), _jsxs(DropdownMenuContent, { align: "end", sideOffset: 8, children: [_jsxs(DropdownMenuItem, { onClick: () => setThemeSafe("light"), className: "flex items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Sun, { className: "mr-2 h-4 w-4" }), " Light"] }), isActive("light") && _jsx(Check, { className: "h-4 w-4" })] }), _jsxs(DropdownMenuItem, { onClick: () => setThemeSafe("dark"), className: "flex items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Moon, { className: "mr-2 h-4 w-4" }), " Dark"] }), isActive("dark") && _jsx(Check, { className: "h-4 w-4" })] }), _jsxs(DropdownMenuItem, { onClick: () => setThemeSafe("blue-dark"), className: "flex items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Waves, { className: "mr-2 h-4 w-4" }), " Custom"] }), isActive("blue-dark") && _jsx(Check, { className: "h-4 w-4" })] })] })] }));
}
