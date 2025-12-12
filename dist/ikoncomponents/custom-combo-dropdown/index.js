"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../shadcn/form";
import { cn } from "../../utils/cn";
import { Button } from "../../shadcn/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn/popover";
import { Input } from "../../shadcn/input";
export function CustomComboboxInput({ formControl, name, label, options, placeholder = "Select an option", emptyMessage = "No options found.", onValueChange, className, addNewPlaceholder = "Add custom value...", formDescription, disabled, }) {
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const [items, setItems] = React.useState(options);
    const [isAddingNew, setIsAddingNew] = React.useState(false);
    const [newValue, setNewValue] = React.useState("");
    React.useEffect(() => {
        setItems(options);
    }, [options]);
    return (_jsx(FormField, { control: formControl, name: name, render: ({ field }) => {
            const selectedItem = items.find((item) => item.value === field.value);
            const handleAddNewItem = () => {
                const trimmedValue = newValue.trim();
                if (!trimmedValue)
                    return;
                if (items.some((item) => item.value === trimmedValue)) {
                    const existingItem = items.find(i => i.value === trimmedValue);
                    if (existingItem) {
                        field.onChange(existingItem.value);
                        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(existingItem.value);
                        setNewValue("");
                        setIsAddingNew(false);
                        setOpen(false);
                        setSearchValue("");
                    }
                    return;
                }
                const newOption = {
                    value: trimmedValue,
                    label: trimmedValue,
                    disabled: true,
                };
                setItems((prev) => [...prev, newOption]);
                field.onChange(trimmedValue);
                onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(trimmedValue);
                setNewValue("");
                setIsAddingNew(false);
                setOpen(false);
                setSearchValue("");
            };
            return (_jsxs(FormItem, { className: cn(className), children: [label && (_jsxs(_Fragment, { children: [_jsx(FormLabel, { children: label }), _jsx("br", {})] })), _jsxs(Popover, { open: open, onOpenChange: (isOpen) => {
                            setOpen(isOpen);
                            if (!isOpen) {
                                setSearchValue("");
                                setIsAddingNew(false);
                                setNewValue("");
                            }
                        }, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(FormControl, { children: _jsxs(Button, { variant: "outline", role: "combobox", "aria-expanded": open, className: cn("w-full justify-between", !field.value && "text-foreground/50", className), disabled: disabled || field.disabled, children: [_jsx("span", { className: "line-clamp-1 text-left", children: field.value
                                                    ? selectedItem
                                                        ? selectedItem.label
                                                        : field.value
                                                    : placeholder }), _jsx(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })] }) }) }), _jsx(PopoverContent, { className: "p-0 w-[--radix-popover-trigger-width]", align: "start", children: _jsxs(Command, { shouldFilter: true, children: [_jsx(CommandInput, { placeholder: "Search...", value: searchValue, onValueChange: setSearchValue }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: searchValue && items.length > 0 ? "No results found." : emptyMessage }), _jsx(CommandGroup, { children: items
                                                        .filter(item => item.label.toLowerCase().includes(searchValue.toLowerCase()) || item.value.toLowerCase().includes(searchValue.toLowerCase()))
                                                        .map((item) => (_jsxs(CommandItem, { value: item.value, onSelect: (currentValue) => {
                                                            field.onChange(currentValue);
                                                            onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(currentValue);
                                                            setOpen(false);
                                                            setSearchValue("");
                                                        }, className: "cursor-pointer", disabled: item === null || item === void 0 ? void 0 : item.disabled, children: [_jsx(Check, { className: cn("mr-2 h-4 w-4", field.value === item.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0") }), item.label] }, item.value))) })] }), _jsx("div", { className: "border-t p-2", children: isAddingNew ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Input, { placeholder: addNewPlaceholder, value: newValue, onChange: (e) => setNewValue(e.target.value), onKeyDown: (e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault();
                                                                handleAddNewItem();
                                                            }
                                                            if (e.key === "Escape") {
                                                                setIsAddingNew(false);
                                                                setNewValue("");
                                                            }
                                                        }, autoFocus: true, className: "h-8" }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
                                                            setIsAddingNew(false);
                                                            setNewValue("");
                                                        }, className: "h-8", children: "Cancel" }), _jsx(Button, { size: "sm", variant: "default", onClick: handleAddNewItem, className: "h-8", disabled: !newValue.trim() || items.some(item => item.value === newValue.trim()), children: "Add" })] })) : (_jsxs(Button, { variant: "outline", className: "w-full justify-start", onClick: () => setIsAddingNew(true), children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Add new option"] })) })] }) })] }), formDescription && (_jsx(FormDescription, { children: formDescription })), _jsx(FormMessage, {})] }));
        } }));
}
