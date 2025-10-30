"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "../../shadcn/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, } from "../../shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn/popover";
export function FrameworkItemDropdown({ processedData, value, onChange, placeholder = "Select items...", searchPlaceholder = "Search...", className, }) {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const { flatTree, itemMap } = processedData;
    const selectionState = React.useMemo(() => {
        const state = new Map();
        const selectedSet = new Set(value);
        [...flatTree].reverse().forEach((item) => {
            const nodeInfo = itemMap[item.id];
            if (!nodeInfo ||
                !item.treatAsParent ||
                nodeInfo.childrenIds.length === 0) {
                if (selectedSet.has(item.id)) {
                    state.set(item.id, "checked");
                }
            }
            else {
                const childStates = nodeInfo.childrenIds.map((childId) => state.get(childId));
                const checkedCount = childStates.filter((s) => s === "checked").length;
                const indeterminateCount = childStates.filter((s) => s === "indeterminate").length;
                if (checkedCount === nodeInfo.childrenIds.length) {
                    state.set(item.id, "checked");
                }
                else if (checkedCount > 0 || indeterminateCount > 0) {
                    state.set(item.id, "indeterminate");
                }
            }
        });
        return state;
    }, [value, flatTree, itemMap]);
    const handleSelect = (item) => {
        var _a, _b, _c;
        const newSelectedIds = new Set(value);
        const currentState = selectionState.get(item.id);
        const shouldBeChecked = !(currentState === "checked" || currentState === "indeterminate");
        const descendants = new Set();
        const queue = [...(((_a = itemMap[item.id]) === null || _a === void 0 ? void 0 : _a.childrenIds) || [])];
        while (queue.length > 0) {
            const currentId = queue.shift();
            descendants.add(currentId);
            const children = ((_b = itemMap[currentId]) === null || _b === void 0 ? void 0 : _b.childrenIds) || [];
            children.forEach((childId) => queue.push(childId));
        }
        if (shouldBeChecked) {
            newSelectedIds.add(item.id);
            descendants.forEach((id) => newSelectedIds.add(id));
        }
        else {
            newSelectedIds.delete(item.id);
            descendants.forEach((id) => newSelectedIds.delete(id));
        }
        let parentId = (_c = itemMap[item.id]) === null || _c === void 0 ? void 0 : _c.parentId;
        while (parentId) {
            const parentInfo = itemMap[parentId];
            if (parentInfo && parentInfo.childrenIds.length > 0) {
                const areAllChildrenSelected = parentInfo.childrenIds.every((childId) => newSelectedIds.has(childId));
                if (areAllChildrenSelected) {
                    newSelectedIds.add(parentId);
                }
                else {
                    newSelectedIds.delete(parentId);
                }
            }
            parentId = parentInfo === null || parentInfo === void 0 ? void 0 : parentInfo.parentId;
        }
        onChange(Array.from(newSelectedIds));
    };
    const filteredItems = React.useMemo(() => {
        if (!searchQuery)
            return flatTree.slice(); // Always return a new array in original order
        const lowercasedQuery = searchQuery.toLowerCase();
        const matchedIds = new Set();
        // Step 1: collect directly matched items
        flatTree.forEach((item) => {
            const matches = item.title.toLowerCase().includes(lowercasedQuery) ||
                item.description.toLowerCase().includes(lowercasedQuery) ||
                item.index.toLowerCase().includes(lowercasedQuery);
            if (matches) {
                matchedIds.add(item.id);
            }
        });
        // Step 2: collect ancestors and descendants
        const expandedIds = new Set(matchedIds);
        const addAncestors = (id) => {
            var _a;
            let current = id;
            while (current) {
                const parentId = (_a = itemMap[current]) === null || _a === void 0 ? void 0 : _a.parentId;
                if (parentId && !expandedIds.has(parentId)) {
                    expandedIds.add(parentId);
                    current = parentId;
                }
                else {
                    break;
                }
            }
        };
        const addDescendants = (id) => {
            var _a;
            const children = ((_a = itemMap[id]) === null || _a === void 0 ? void 0 : _a.childrenIds) || [];
            for (const childId of children) {
                if (!expandedIds.has(childId)) {
                    expandedIds.add(childId);
                    addDescendants(childId);
                }
            }
        };
        matchedIds.forEach((id) => {
            addAncestors(id);
            addDescendants(id);
        });
        // Step 3: Return nodes in the original flatTree order, but only those in expandedIds
        return flatTree.filter((node) => expandedIds.has(node.id));
    }, [searchQuery, flatTree, itemMap]);
    const getSelectedLabel = () => {
        const leafNodeIds = value.filter((id) => {
            const nodeInfo = itemMap[id];
            return !nodeInfo || nodeInfo.childrenIds.length === 0;
        });
        if (leafNodeIds.length === 0) {
            return _jsx("span", { className: "text-muted-foreground", children: placeholder });
        }
        if (leafNodeIds.length === 1) {
            const item = flatTree.find((i) => i.id === leafNodeIds[0]);
            return item ? item.index : placeholder;
        }
        return `${leafNodeIds.length} items selected`;
    };
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", role: "combobox", "aria-expanded": open, className: cn("w-full justify-between transition-all duration-150 ease-in-out border hover:border-primary hover:shadow-sm bg-secondary cursor-pointer", className), children: [_jsx("span", { className: "truncate", children: getSelectedLabel() }), _jsx(ChevronsUpDown, { className: cn("ml-2 h-4 w-4 shrink-0 transition-transform duration-200", open && "rotate-180") })] }) }), _jsx(PopoverContent, { className: "w-[--radix-popover-trigger-width] p-0 max-h-[400px] overflow-y-auto", children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: searchPlaceholder, value: searchQuery, onValueChange: setSearchQuery }), _jsxs(CommandList, { className: "transition-all duration-200 ease-in-out", children: [_jsx(CommandEmpty, { children: "No results found." }), filteredItems.map((item) => (_jsxs(CommandItem, { value: `${item.index} ${item.title} ${item.description}`, onSelect: () => handleSelect(item), className: "flex items-start cursor-pointer gap-2", style: { paddingLeft: `${item.level * 1.5 + 0.75}rem` }, children: [_jsx("input", { type: "checkbox", className: "mt-1 h-4 w-4 accent-primary border rounded", checked: selectionState.get(item.id) === "checked", ref: (el) => {
                                                if (el) {
                                                    el.indeterminate =
                                                        selectionState.get(item.id) === "indeterminate";
                                                }
                                            }, readOnly: true }), _jsxs("div", { className: "flex flex-col", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded", children: item.index }), _jsx("span", { className: "font-medium", children: item.title })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: item.description })] })] }, item.id)))] })] }) })] }));
}
