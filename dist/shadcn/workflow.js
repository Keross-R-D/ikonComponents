"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "./dropdown-menu";
import { Badge } from "./badge";
const statusColors = {
    OUTSTANDING: "bg-[#FFDE721A] text-[#FBB125] border border-[#FBB12533]",
    "IN PROGRESS": "bg-[#6A77D91A] text-[#6A77D9]",
    COMPLETED: "bg-[#519E591A] text-[#519E59] border border-[#FBB12533]",
};
export function Workflow({ name, steps, style }) {
    const completedCount = steps.filter((s) => s.status === "COMPLETED").length;
    const progressPercent = (completedCount / steps.length) * 100;
    return (_jsxs("div", { style: style, className: "p-4 space-y-2 rounded-lg border dark:bg-[#171717] text-primary blue-dark:bg-[#1B2336]", children: [_jsx("h2", { className: "text-sm font-semibold mb-4 m-3", children: name }), steps.map((step) => {
                var _a;
                const stepId = (_a = step.id) !== null && _a !== void 0 ? _a : "";
                return (_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border border-neutral-600 rounded-md gap-1 sm:gap-2 m-2", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto", children: [_jsx("div", { className: "w-7 h-7 sm:w-9 sm:h-9 dark:bg-neutral-800 bg-[var(--keross-skeleton-bg)] rounded-sm flex-shrink-0" }), _jsxs("div", { className: "flex flex-col text-md", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { className: "font-semibold", children: step.title }), step.status === "IN PROGRESS" && step.dropdownOptions && (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx("button", { className: "p-1", children: _jsx(ChevronDown, { className: "w-4 h-4 cursor-pointer" }) }) }), _jsx(DropdownMenuContent, { className: "w-50 ml-40", children: step.dropdownOptions.map((node, index) => (_jsx(React.Fragment, { children: node }, index))) })] }))] }), step.owner && (_jsx("span", { className: "text-sm text-neutral-400", children: step.owner })), step.createdAt && (_jsxs("span", { className: "text-sm text-neutral-500", children: ["Created on ", step.createdAt] }))] })] }), _jsx("div", { className: "mt-1 sm:mt-0 flex-shrink-0", children: _jsx(Badge, { className: statusColors[step.status], children: step.status }) })] }, stepId));
            }), _jsxs("div", { className: "text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center pt-1", children: [_jsxs("span", { children: [steps.length, " steps total"] }), _jsxs("span", { children: [completedCount, " completed"] })] }), _jsx("div", { className: "w-full bg-gray-300 dark:bg-gray-700 h-1 rounded-full overflow-hidden mt-1", children: _jsx("div", { className: "h-1 bg-blue-500 dark:bg-blue-400 transition-all", style: { width: `${progressPercent}%` } }) })] }));
}
