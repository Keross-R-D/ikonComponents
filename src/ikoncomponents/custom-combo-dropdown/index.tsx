"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../shadcn/form";
import { cn } from "../../utils/cn";
import { Button } from "../../shadcn/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn/popover";
import { Input } from "../../shadcn/input";

export type Option = {
    value: string;
    label: string;
    disabled?: boolean;
};

type CustomComboboxInputProps = {
    formControl: any;
    name: string;
    label?: string | React.ReactNode;
    options: Option[];
    placeholder?: string;
    emptyMessage?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    addNewPlaceholder?: string;
    formDescription?: string;
    disabled?: boolean;
};

export function CustomComboboxInput({
    formControl,
    name,
    label,
    options,
    placeholder = "Select an option",
    emptyMessage = "No options found.",
    onValueChange,
    className,
    addNewPlaceholder = "Add custom value...",
    formDescription,
    disabled, 
}: CustomComboboxInputProps) {
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const [items, setItems] = React.useState<Option[]>(options);
    const [isAddingNew, setIsAddingNew] = React.useState(false);
    const [newValue, setNewValue] = React.useState("");

    React.useEffect(() => {
        setItems(options);
    }, [options]);

    return (
        <FormField
            control={formControl}
            name={name}
            render={({ field }) => {
                const selectedItem = items.find((item) => item.value === field.value);

                const handleAddNewItem = () => {
                    const trimmedValue = newValue.trim();
                    if (!trimmedValue) return;

                    if (items.some((item) => item.value === trimmedValue)) {
                        const existingItem = items.find(i => i.value === trimmedValue);
                        if (existingItem) {
                            field.onChange(existingItem.value);
                            onValueChange?.(existingItem.value);
                            setNewValue("");
                            setIsAddingNew(false);
                            setOpen(false);
                            setSearchValue("");
                        }
                        return;
                    }

                    const newOption: Option = {
                        value: trimmedValue,
                        label: trimmedValue, 
                        disabled: true,
                    };

                    setItems((prev) => [...prev, newOption]);
                    field.onChange(trimmedValue);
                    onValueChange?.(trimmedValue);

                    setNewValue("");
                    setIsAddingNew(false);
                    setOpen(false);
                    setSearchValue("");
                };

                return (
                    <FormItem className={cn(className)}> 
                        {label && (
                            <>
                                <FormLabel>{label}</FormLabel>
                                <br />
                            </>
                        )}
                        <Popover
                            open={open}
                            onOpenChange={(isOpen) => {
                                setOpen(isOpen);
                                if (!isOpen) {
                                    setSearchValue(""); 
                                    setIsAddingNew(false);
                                    setNewValue("");     
                                }
                            }}
                        >
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className={cn(
                                            "w-full justify-between",
                                            !field.value && "text-foreground/50",
                                            className 
                                        )}
                                    disabled={disabled || field.disabled}
                                    >
                                        <span className="line-clamp-1 text-left">
                                            {field.value
                                                ? selectedItem
                                                    ? selectedItem.label
                                                    : field.value
                                                : placeholder}
                                        </span>
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
                                <Command shouldFilter={true}> 
                                    <CommandInput
                                        placeholder="Search..."
                                        value={searchValue}
                                        onValueChange={setSearchValue}
                                    />
                                    <CommandList>
                                        <CommandEmpty>
                                            {searchValue && items.length > 0 ? "No results found." : emptyMessage}
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {items
                                                .filter(item => item.label.toLowerCase().includes(searchValue.toLowerCase()) || item.value.toLowerCase().includes(searchValue.toLowerCase()))
                                                .map((item) => (
                                                    <CommandItem
                                                        key={item.value}
                                                        value={item.value} 
                                                        onSelect={(currentValue) => { 
                                                            field.onChange(currentValue);
                                                            onValueChange?.(currentValue);
                                                            setOpen(false);
                                                            setSearchValue(""); 
                                                        }}
                                                        className="cursor-pointer"
                                                    disabled={item?.disabled} 
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                field.value === item.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {item.label}
                                                    </CommandItem>
                                                ))}
                                        </CommandGroup>
                                    </CommandList>
                                    <div className="border-t p-2">
                                        {isAddingNew ? (
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    placeholder={addNewPlaceholder}
                                                    value={newValue}
                                                    onChange={(e) => setNewValue(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            handleAddNewItem();
                                                        }
                                                        if (e.key === "Escape") {
                                                            setIsAddingNew(false);
                                                            setNewValue("");
                                                        }
                                                    }}
                                                    autoFocus
                                                    className="h-8"
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => {
                                                        setIsAddingNew(false);
                                                        setNewValue("");
                                                    }}
                                                    className="h-8"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="default"
                                                    onClick={handleAddNewItem}
                                                    className="h-8"
                                                    disabled={!newValue.trim() || items.some(item => item.value === newValue.trim())}
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start"
                                                onClick={() => setIsAddingNew(true)}
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add new option
                                            </Button>
                                        )}
                                    </div>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        {formDescription && (
                            <FormDescription>{formDescription}</FormDescription>
                        )}
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}