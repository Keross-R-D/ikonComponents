'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function PageWrapper({ title, subtitle, tools, children }) {
    title = title !== null && title !== void 0 ? title : '';
    subtitle = subtitle !== null && subtitle !== void 0 ? subtitle : '';
    return (_jsxs("div", { className: "flex flex-col gap-4 h-full", children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsxs("div", { className: 'grid grid-cols-1 gap-1', children: [title && _jsx("h1", { className: 'text-2xl font-semibold', children: title }), subtitle && _jsx("p", { className: 'text-muted-foreground/60', children: subtitle })] }), _jsx("div", { children: tools })] }), children] }));
}
