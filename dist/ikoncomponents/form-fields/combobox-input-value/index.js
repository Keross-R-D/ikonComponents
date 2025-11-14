'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useController } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "../../../shadcn/form";
import { Popover, PopoverContent, PopoverTrigger } from "../../../shadcn/popover";
import { Button } from "../../../shadcn/button";
import { cn } from "../../../utils/cn";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../../shadcn/command";
export function FormComboboxInputWithValue(props) {
    const { field } = useController({ name: props.name, control: props.formControl });
    // Use the external value if provided, otherwise use the field's value.
    const currentValue = props.value !== undefined ? props.value : field.value;
    return (_jsx(FormField, { control: props.formControl, name: props.name, render: ({ field }) => {
            var _a;
            return (_jsxs(FormItem, { className: "", children: [props.label && (_jsxs(_Fragment, { children: [_jsx(FormLabel, { children: props.label }), _jsx("br", {})] })), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, className: "w-full", children: _jsx(FormControl, { children: _jsxs(Button, { variant: "outline", role: "combobox", className: cn("justify-between", !currentValue && "text-muted-foreground"), disabled: typeof props.disabled === "function" ? props.disabled() : props.disabled, children: [currentValue
                                                ? ((_a = props.items.find((item) => item.value === currentValue)) === null || _a === void 0 ? void 0 : _a.label) || currentValue
                                                : props.placeholder, _jsx(ChevronsUpDown, { className: "opacity-50" })] }) }) }), _jsx(PopoverContent, { className: "p-0", align: "start", children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Search..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No items found." }), _jsx(CommandGroup, { children: props.items.map((item) => (_jsxs(CommandItem, { value: item.value, disabled: typeof item.disabled === "function"
                                                            ? item.disabled(item)
                                                            : item.disabled, onSelect: (value) => {
                                                            field.onChange(value);
                                                            props.onSelect && props.onSelect(value);
                                                            props.onChange && props.onChange(value);
                                                        }, children: [(item === null || item === void 0 ? void 0 : item.label) || item.value, _jsx(Check, { className: cn("ml-auto", item.value === currentValue ? "opacity-100" : "opacity-0") })] }, item.value))) })] })] }) })] }), props.formDescription && (_jsx(FormDescription, { children: props.formDescription })), _jsx(FormMessage, {})] }));
        } }));
}
