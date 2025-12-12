import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn/popover";
import { Button } from "../../shadcn/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../shadcn/command";
import { cn } from "../../utils/cn";
export function ComboboxInput({ placeholder, items, disabled, onSelect, defaultValue }) {
    var _a;
    const [value, setValue] = useState(defaultValue ? defaultValue : '');
    return (_jsx(_Fragment, { children: _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, className: "w-full", children: _jsxs(Button, { variant: "outline", role: "combobox", className: cn("justify-between", !value && "text-muted-foreground", "bg-secondary"), disabled: disabled == true || (disabled && disabled(...arguments)), children: [value
                                ? ((_a = items.find((item) => item.value === value)) === null || _a === void 0 ? void 0 : _a.label) || value
                                : placeholder, _jsx(ChevronsUpDown, { className: "opacity-50" })] }) }), _jsx(PopoverContent, { className: "p-0", align: "start", children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Search..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No items found." }), _jsx(CommandGroup, { children: items.map((item) => (_jsxs(CommandItem, { value: item.value, disabled: item.disabled == true ||
                                                (item.disabled && item.disabled(item)), onSelect: (value) => {
                                                setValue(value);
                                                onSelect && onSelect(value);
                                            }, children: [(item === null || item === void 0 ? void 0 : item.label) || item.value, _jsx(Check, { className: cn("ml-auto", item.value === value ? "opacity-100" : "opacity-0") })] }, item.value))) })] })] }) })] }) }));
}
