"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../../shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../../shadcn/popover";
import { cn } from "../../../utils/cn";
import { useState } from "react";
import { TooltipComponent as Tooltip } from "../../tooltip";
import { IconTextButton } from "../../buttons";
import { Check, Filter } from "lucide-react";
import { getDataTableColumnTitle } from "../function";
import { DataTableFacetedFilter } from "../datatable-faceted-filter";
export function DataTableFilterMenu({ table }) {
    const [selectedFilterItems, setSelectedFilterItems] = useState([]);
    return (_jsxs("div", { className: "flex-grow flex gap-3 items-center overflow-hidden", children: [_jsxs(Popover, { children: [_jsx(Tooltip, { tooltipContent: "Filter", children: _jsx(PopoverTrigger, { asChild: true, children: _jsxs(IconTextButton, { children: [_jsx(Filter, {}), "Filter"] }) }) }), _jsx(PopoverContent, { className: "w-[220px] p-0", align: "start", children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Search..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No results found." }), _jsx(CommandGroup, { children: table
                                                .getAllColumns()
                                                .filter((column) => typeof column.accessorFn !== "undefined" &&
                                                column.getCanHide())
                                                .map((column) => {
                                                const previousValues = new Set(selectedFilterItems);
                                                const isSelected = previousValues.has(column.id);
                                                return (_jsxs(CommandItem, { onSelect: () => {
                                                        if (isSelected) {
                                                            previousValues.delete(column.id);
                                                        }
                                                        else {
                                                            previousValues.add(column.id);
                                                        }
                                                        setSelectedFilterItems([...previousValues]);
                                                    }, children: [_jsx("div", { className: cn("mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-black dark:border-white", isSelected
                                                                ? "bg-black dark:bg-white text-white dark:text-black"
                                                                : "opacity-50 [&_svg]:invisible"), children: _jsx(Check, {}) }), _jsx("span", { className: "overflow-hidden text-ellipsis", title: getDataTableColumnTitle(column), children: getDataTableColumnTitle(column) })] }, column.id));
                                            }) })] })] }) })] }), _jsx("div", { className: "flex-grow flex gap-3 items-center overflow-auto", children: selectedFilterItems.map((columnId) => {
                    const column = table.getColumn(columnId);
                    if (column) {
                        return _jsx(DataTableFacetedFilter, { column: column }, columnId);
                    }
                }) })] }));
}
