"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "./badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./select";
const statusColors = {
    OUTSTANDING: "bg-[#FFDE721A] text-[#FBB125] border border-[#FBB12533]",
    "IN PROGRESS": "bg-[#6A77D91A] text-[#6A77D9]",
    COMPLETED: "bg-[#519E591A] text-[#519E59] border border-[#FBB12533]",
};
export function Workflow({ title = "Deal Workflow", steps }) {
    const completedCount = steps.filter((s) => s.status === "COMPLETED").length;
    const progressPercent = (completedCount / steps.length) * 100;
    return (_jsxs("div", { className: "p-4 space-y-2 rounded-lg border dark:bg-[#171717] text-primary keross:bg-[#1B2336]", children: [_jsx("h2", { className: "text-sm font-semibold mb-4 m-2", children: title }), steps.map((step) => {
                var _a;
                return (_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 border border-neutral-600 rounded-md gap-1 sm:gap-2 m-2", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 w-full sm:w-auto", children: [_jsx("div", { className: "w-6 h-6 sm:w-6 sm:h-6 dark:bg-neutral-800 bg-[var(--keross-skeleton-bg)] rounded-sm flex-shrink-0" }), _jsx("span", { className: "font-medium text-md  max-w-[120px]", children: step.title }), step.dropdownOptions && (_jsxs(Select, { defaultValue: step.selectedOption, children: [_jsx(SelectTrigger, { className: "w-full sm:w-24 mt-1 sm:mt-0 text-xs hover:cursor-pointer", children: _jsx(SelectValue, { placeholder: "Select" }) }), _jsx(SelectContent, { children: (_a = step.dropdownOptions) === null || _a === void 0 ? void 0 : _a.map((opt) => (_jsx(SelectItem, { value: opt.value, className: "text-xs hover:cursor-pointer dark:hover:bg-neutral-700", children: opt.label }, opt.value))) })] }))] }), _jsx("div", { className: "mt-1 sm:mt-0 flex-shrink-0", children: _jsx(Badge, { className: statusColors[step.status], children: step.status }) })] }, step.id));
            }), _jsxs("div", { className: "text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center pt-1 gap-1 sm:gap-0", children: [_jsxs("span", { children: [steps.length, " steps total"] }), _jsxs("span", { children: [completedCount, " completed"] })] }), _jsx("div", { className: "w-full bg-gray-300 dark:bg-gray-700 h-1 rounded-full overflow-hidden mt-1", children: _jsx("div", { className: "bg-blue-500 dark:bg-blue-400 h-1 transition-all", style: { width: `${progressPercent}%` } }) })] }));
}
