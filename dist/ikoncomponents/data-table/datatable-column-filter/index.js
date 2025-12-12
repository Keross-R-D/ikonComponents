import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../../shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../../shadcn/popover";
import { Check, Settings2 } from "lucide-react";
import { getDataTableColumnTitle } from "../function";
import { TooltipComponent as Tooltip } from "../../tooltip";
import { IconTextButton } from "../../buttons";
import { cn } from "../../../utils/cn";
export function DataTableColumnFilter({ table, }) {
    return (_jsxs(Popover, { children: [_jsx(Tooltip, { tooltipContent: "Column View", children: _jsx(PopoverTrigger, { asChild: true, children: _jsxs(IconTextButton, { children: [_jsx(Settings2, {}), "View"] }) }) }), _jsx(PopoverContent, { className: "w-[220px] p-0", align: "end", children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Search..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No results found." }), _jsx(CommandGroup, { children: table
                                        .getAllColumns()
                                        .filter((column) => typeof column.accessorFn !== "undefined" &&
                                        column.getCanHide())
                                        .map((column) => {
                                        const isVisbile = column.getIsVisible();
                                        return (_jsxs(CommandItem, { onSelect: () => {
                                                column.toggleVisibility(!isVisbile);
                                            }, disabled: column.getIsGrouped(), children: [_jsx("div", { className: cn("mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-black dark:border-white", isVisbile
                                                        ? "bg-black dark:bg-white text-white dark:text-black"
                                                        : "opacity-50 [&_svg]:invisible"), children: _jsx(Check, {}) }), _jsx("span", { className: "overflow-hidden text-ellipsis", title: getDataTableColumnTitle(column), children: getDataTableColumnTitle(column) })] }, column.id));
                                    }) })] })] }) })] }));
}
