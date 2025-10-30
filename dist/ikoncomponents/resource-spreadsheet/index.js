import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "../../shadcn/card";
import { Input } from "../../shadcn/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shadcn/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../shadcn/table";
import { ChevronDown, ChevronRight } from "lucide-react";
import * as React from "react";
import { useFormContext } from "react-hook-form";
const groupResourcesByTask = (resources) => {
    const groupedMap = resources.reduce((acc, resource) => {
        const taskId = resource.taskId;
        if (!acc.has(taskId)) {
            acc.set(taskId, {
                taskId,
                taskName: resource.taskName,
                resources: []
            });
        }
        acc.get(taskId).resources.push(resource);
        return acc;
    }, new Map());
    return Array.from(groupedMap.values());
};
export const ResourceTable = ({ resourceDataWithAllocation, userMaps, monthsRange }) => {
    const { setValue } = useFormContext();
    const [expandedTasks, setExpandedTasks] = React.useState(new Set());
    const groupedResources = groupResourcesByTask(resourceDataWithAllocation);
    const toggleTask = (taskId) => {
        setExpandedTasks((prev) => {
            const newSet = new Set(prev);
            newSet.has(taskId) ? newSet.delete(taskId) : newSet.add(taskId);
            return newSet;
        });
    };
    return (_jsx(Card, { className: "p-0 bg-background", children: _jsx(CardContent, { className: "p-0", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[300px] py-5", children: "Task Name" }), _jsx(TableHead, { className: "w-[200px] py-5", children: "Employee Name" }), _jsx(TableHead, { className: "w-[200px] py-5", children: "Role" }), monthsRange.map((month) => (_jsx(TableHead, { className: "w-[100px] py-5", children: month.replace("_", " ") }, month)))] }) }), _jsx(TableBody, { children: groupedResources.map((group) => (_jsxs(React.Fragment, { children: [_jsx(TableRow, { className: "cursor-pointer hover:bg-accent", onClick: () => toggleTask(group.taskId), children: _jsx(TableCell, { colSpan: 3 + monthsRange.length, children: _jsxs("div", { className: "flex items-center gap-2", children: [expandedTasks.has(group.taskId) ? _jsx(ChevronDown, { className: "h-4 w-4 text-primary" }) : _jsx(ChevronRight, { className: "h-4 w-4 text-primary" }), _jsx("span", { className: "font-medium", children: group.taskName })] }) }) }), expandedTasks.has(group.taskId) && group.resources.map((resource) => (_jsxs(TableRow, { className: "hover:bg-muted/30", children: [_jsx(TableCell, { className: "pl-8", children: _jsx(Input, { value: resource.taskName, disabled: true, className: "w-full bg-transparent border-0 px-0 disabled:opacity-100" }) }), _jsx(TableCell, { children: _jsxs(Select, { defaultValue: resource.resourceId, children: [_jsx(SelectTrigger, { className: "w-full bg-secondary dark:bg-secondary", children: _jsx(SelectValue, { placeholder: "Select employee" }) }), _jsx(SelectContent, { children: Object.entries(userMaps.userDetailsMap).map(([id, user]) => (_jsx(SelectItem, { value: id, children: user.name }, id))) })] }) }), _jsx(TableCell, { children: _jsxs(Select, { defaultValue: resource.gradeId.toString(), children: [_jsx(SelectTrigger, { className: "w-full bg-secondary dark:bg-secondary", children: _jsx(SelectValue, { placeholder: "Select role" }) }), _jsx(SelectContent, { children: Object.entries(userMaps.rolesMap).map(([id, role]) => (_jsx(SelectItem, { value: id, children: role.roleName }, id))) })] }) }), monthsRange.map((month) => (_jsx(TableCell, { children: _jsx(Input, { type: "number", min: "0", max: "1", step: "0.01", defaultValue: resource.allocation[month] || 0, className: "w-20" }) }, month)))] }, `${resource.taskId}-${resource.resourceId}`)))] }, group.taskId))) })] }) }) }));
};
