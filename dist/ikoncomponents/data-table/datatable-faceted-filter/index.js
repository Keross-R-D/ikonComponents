import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Check, Plus, X } from "lucide-react";
import { cn } from "../../../utils/cn";
import { Badge } from "../../../shadcn/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, } from "../../../shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../../shadcn/popover";
import { Separator } from "../../../shadcn/separator";
import { getDataTableColumnTitle } from "../function";
import { IconTextButtonWithTooltip } from "../../buttons";
export function DataTableFacetedFilter({ column, }) {
    const facets = column === null || column === void 0 ? void 0 : column.getFacetedUniqueValues();
    const selectedValues = new Set(column === null || column === void 0 ? void 0 : column.getFilterValue());
    const sortedUniqueValues = React.useMemo(() => Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000), [column.getFacetedUniqueValues()]);
    return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(IconTextButtonWithTooltip, { variant: "dashed", tooltipContent: getDataTableColumnTitle(column), children: [(selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.size) > 0 ?
                            _jsx(X, {})
                            :
                                _jsx(Plus, {}), getDataTableColumnTitle(column), (selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.size) > 0 && (_jsxs(_Fragment, { children: [_jsx(Separator, { orientation: "vertical", className: "mx-2 h-4" }), _jsx(Badge, { variant: "secondary", className: "rounded-sm px-1 font-normal lg:hidden", children: selectedValues.size }), _jsx("div", { className: "hidden space-x-1 lg:flex", children: selectedValues.size > 2 ? (_jsxs(Badge, { variant: "secondary", className: "rounded-sm px-1 font-normal", children: [selectedValues.size, " selected"] })) : (sortedUniqueValues
                                        .filter((option) => selectedValues.has(option))
                                        .map((option) => (_jsx(Badge, { variant: "secondary", className: "rounded-sm px-1 font-normal", children: option }, option)))) })] }))] }) }), _jsx(PopoverContent, { className: "max-w-[250px] p-0", align: "start", children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: getDataTableColumnTitle(column) }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No results found." }), _jsx(CommandGroup, { children: sortedUniqueValues.map((option) => {
                                        const isSelected = selectedValues.has(option);
                                        return (_jsxs(CommandItem, { onSelect: () => {
                                                if (isSelected) {
                                                    selectedValues.delete(option);
                                                }
                                                else {
                                                    selectedValues.add(option);
                                                }
                                                const filterValues = Array.from(selectedValues);
                                                column === null || column === void 0 ? void 0 : column.setFilterValue(filterValues.length ? filterValues : undefined);
                                            }, children: [_jsx("div", { className: cn("mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-black dark:border-white", isSelected
                                                        ? "bg-black dark:bg-white text-white dark:text-black"
                                                        : "opacity-50 [&_svg]:invisible"), children: _jsx(Check, {}) }), _jsx("span", { className: "overflow-hidden text-ellipsis", title: option, children: option }), (facets === null || facets === void 0 ? void 0 : facets.get(option)) && (_jsx("span", { className: "ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs", children: facets.get(option) }))] }, option));
                                    }) })] }), selectedValues.size > 0 && (_jsxs(_Fragment, { children: [_jsx(CommandSeparator, {}), _jsx(CommandGroup, { children: _jsx(CommandItem, { onSelect: () => column === null || column === void 0 ? void 0 : column.setFilterValue(undefined), className: "justify-center text-center", children: "Clear filters" }) })] }))] }) })] }));
}
