import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "../../../shadcn/form";
import { Popover, PopoverContent, PopoverTrigger } from "../../../shadcn/popover";
import { Button } from "../../../shadcn/button";
import { cn } from "../../../utils/cn";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../../shadcn/command";
export function FormComboboxInput({ formControl, name, label, placeholder, formDescription, items, disabled, onSelect, }) {
    return (_jsx(_Fragment, { children: _jsx(FormField, { control: formControl, name: name, render: ({ field }) => {
                var _a;
                return (_jsxs(FormItem, { className: "", children: [label && (_jsx(_Fragment, { children: _jsx(FormLabel, { children: label }) })), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, className: "w-full", children: _jsx(FormControl, { children: _jsxs(Button, { variant: "outline", role: "combobox", className: cn("justify-between", !field.value && "text-muted-foreground"), disabled: disabled == true ||
                                                (disabled && disabled(...arguments)), children: [field.value
                                                    ? ((_a = items.find((item) => item.value === field.value)) === null || _a === void 0 ? void 0 : _a.label) || field.value
                                                    : placeholder, _jsx(ChevronsUpDown, { className: "opacity-50" })] }) }) }), _jsx(PopoverContent, { className: "p-0", align: "start", children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Search..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No items found." }), _jsx(CommandGroup, { children: items.map((item) => (_jsxs(CommandItem, { value: item.value, disabled: (item.disabled == true || (item.disabled && item.disabled(item))), onSelect: (value) => {
                                                                field.onChange(value);
                                                                onSelect && onSelect(value);
                                                            }, children: [(item === null || item === void 0 ? void 0 : item.label) || item.value, _jsx(Check, { className: cn("ml-auto", item.value === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0") })] }, item.value))) })] })] }) })] }), formDescription && (_jsx(FormDescription, { children: formDescription })), _jsx(FormMessage, {})] }));
            } }) }));
}
