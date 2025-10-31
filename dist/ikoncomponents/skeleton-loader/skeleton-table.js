"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "../../shadcn/skeleton";
export function GradeTableLoader({ rowCount = 6, showToolbar = true, }) {
    return (_jsxs("div", { className: "space-y-4", children: [showToolbar && (_jsxs("div", { className: "flex justify-between", children: [_jsx(Skeleton, { className: "h-8 w-64 rounded-md" }), _jsx(Skeleton, { className: "h-8 w-32 rounded-md" })] })), _jsx("div", { className: "space-y-4", children: [...Array(rowCount)].map((_, i) => (_jsx("div", { className: "grid gap-4 items-center", children: _jsx(Skeleton, { className: "h-8 w-full" }) }, i))) })] }));
}
