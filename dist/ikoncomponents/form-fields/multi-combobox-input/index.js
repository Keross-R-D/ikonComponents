import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/shadcn/ui/form";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// // import { FormComboboxInputProps } from "@/ikon/components/form-fields/types";
// import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
// import { Button } from "@/shadcn/ui/button";
// import { cn } from "@/shadcn/lib/utils";
// import { Check, ChevronsUpDown } from "lucide-react";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/shadcn/ui/command";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shadcn/ui/tooltip";
// import { X } from "lucide-react";
// import { FormComboboxInputProps as BaseFormComboboxInputProps } from "@/ikon/components/form-fields/types";
// interface FormComboboxInputProps extends BaseFormComboboxInputProps {
//   defaultOptions?: number; // Add defaultOptions to the type
// }
// export default function dFormMultiComboboxInput({
//   formControl,
//   name,
//   label,
//   placeholder,
//   formDescription,
//   items = [], // fallback to empty array
//   disabled,
//   onSelect,
//   defaultValue = [],
//   defaultOptions = 2,
// }: FormComboboxInputProps) {
//   const [search, setSearch] = useState("");
//   const containerRef = useRef<HTMLDivElement>(null);
//   // Filter items based on search
//   const filteredItems = items.filter((item) =>
//       item.label?.toLowerCase().includes(search.toLowerCase())
//   )
//       .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""));
//   return (
//       <FormField
//           control={formControl}
//           name={name}
//           render={({ field }) => {
//               // Initialize defaultValue if field.value is undefined
//               useEffect(() => {
//                   if (
//                       (field.value === undefined || field.value === null) &&
//                       defaultValue.length > 0
//                   ) {
//                       field.onChange(defaultValue);
//                   }
//               }, [defaultValue, field]);
//               // field.value is the selected array, default to [] if undefined
//               const selectedItems = field.value || [];
//               const [visibleCount, setVisibleCount] = useState(selectedItems.length);
//               const calculateVisibleItems = useCallback(() => {
//                   const container = containerRef.current;
//                   if (!container) return visibleCount;
//                   const children = Array.from(container.children) as HTMLElement[];
//                   let availableWidth = container.offsetWidth;
//                   let usedWidth = 0;
//                   let fitCount = 0;
//                   for (const child of children) {
//                       const childWidth = child.offsetWidth + 4; // gap/margin
//                       if (usedWidth + childWidth <= availableWidth) {
//                           usedWidth += childWidth;
//                           fitCount++;
//                       } else {
//                           break;
//                       }
//                   }
//                   return fitCount;
//               }, []); // No dependencies
//               useEffect(() => {
//                   const container = containerRef.current;
//                   if (!container) return;
//                   let animationFrameId: number | null = null;
//                   const resizeObserver = new ResizeObserver(() => {
//                       if (animationFrameId) cancelAnimationFrame(animationFrameId);
//                       animationFrameId = requestAnimationFrame(() => {
//                           const newVisibleCount = calculateVisibleItems();
//                           setVisibleCount((prevVisibleCount: number) => {
//                               if (prevVisibleCount !== newVisibleCount) {
//                                   return newVisibleCount;
//                               }
//                               return prevVisibleCount;
//                           });
//                       });
//                   });
//                   resizeObserver.observe(container);
//                   // Initial calculation
//                   setVisibleCount(calculateVisibleItems());
//                   // Cleanup
//                   return () => {
//                       if (animationFrameId) cancelAnimationFrame(animationFrameId);
//                       resizeObserver.disconnect();
//                   };
//               }, [calculateVisibleItems]); // Only depend on calculateVisibleItems
//               // Toggle select/unselect item
//               const toggleItem = (value: string) => {
//                   let updatedItems;
//                   if (selectedItems.includes(value)) {
//                       updatedItems = selectedItems.filter((v: string) => v !== value);
//                   } else {
//                       updatedItems = [...selectedItems, value];
//                   }
//                   field.onChange(updatedItems);
//                   onSelect && onSelect(updatedItems);
//               };
//               const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
//                   const el = e.currentTarget;
//                   el.scrollTop += e.deltaY; // manually scroll
//                   e.preventDefault(); // prevent parent scroll
//               };
//               return (
//                   <FormItem>
//                       {label && <FormLabel>{label}</FormLabel>}
//                       <Popover>
//                           <PopoverTrigger asChild className="w-full">
//                               <FormControl>
//                                   <Button
//                                       variant="outline"
//                                       role="combobox"
//                                       className={cn(
//                                           "justify-between",
//                                           !selectedItems.length && "text-foreground/50"
//                                       )}
//                                       disabled={
//                                           disabled === true || (disabled && disabled(...arguments))
//                                       }
//                                   >
//                                       {selectedItems.length > 0 ? (
//                                           <TooltipProvider>
//                                               <div ref={containerRef} className="flex flex-wrap gap-2 items-center overflow-hidden">
//                                                   {selectedItems.slice(0, defaultOptions).map((value: string) => {
//                                                       const label = items.find((item) => item.value === value)?.label || value;
//                                                       return (
//                                                           <span
//                                                               key={value}
//                                                               className="flex items-center px-2 py-1 bg-secondary text-secondary-foreground rounded-md truncate max-w-full"
//                                                               title={label}
//                                                           >
//                                                               <span className="truncate max-w-[120px]">{label}</span>
//                                                               <span
//                                                                   role="button"
//                                                                   tabIndex={0}
//                                                                   onClick={(e) => {
//                                                                       e.stopPropagation(); // prevent popover toggle
//                                                                       const updated = selectedItems.filter((v: string) => v !== value);
//                                                                       field.onChange(updated);
//                                                                       onSelect && onSelect(updated);
//                                                                   }}
//                                                                   onKeyDown={(e) => {
//                                                                       if (e.key === 'Enter' || e.key === ' ') {
//                                                                           e.preventDefault();
//                                                                           e.stopPropagation();
//                                                                           const updated = selectedItems.filter((v: string) => v !== value);
//                                                                           field.onChange(updated);
//                                                                           onSelect && onSelect(updated);
//                                                                       }
//                                                                   }}
//                                                                   className="ml-1 text-muted-foreground hover:text-destructive cursor-pointer outline-none"
//                                                               >
//                                                                   <X className="w-3 h-3 ml-1" />
//                                                               </span>
//                                                           </span>
//                                                       );
//                                                   })}
//                                                   {selectedItems.length > defaultOptions && (
//                                                       <Tooltip>
//                                                           <TooltipTrigger asChild>
//                                                               <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md cursor-pointer">
//                                                                   +{selectedItems.length - defaultOptions} more
//                                                               </span>
//                                                           </TooltipTrigger>
//                                                           <TooltipContent className="max-w-xs break-words">
//                                                               <div
//                                                                   onWheel={onWheel}
//                                                                   className="flex flex-col gap-1 max-h-[200px] overflow-auto"
//                                                               >
//                                                                   {selectedItems.slice(defaultOptions).map((value: string) => (
//                                                                       <span key={value} className="text-sm">
//                                                                           {items.find((item) => item.value === value)?.label || value}
//                                                                       </span>
//                                                                   ))}
//                                                               </div>
//                                                           </TooltipContent>
//                                                       </Tooltip>
//                                                   )}
//                                               </div>
//                                           </TooltipProvider>
//                                       ) : (
//                                           placeholder
//                                       )}
//                                       <ChevronsUpDown className="opacity-50" />
//                                   </Button>
//                               </FormControl>
//                           </PopoverTrigger>
//                           <PopoverContent id="multiSelectPopover" className="p-0 w-full max-w-[300px]" align="start">
//                               <Command id="commandPopover">
//                                   <CommandInput
//                                       placeholder="Search..."
//                                       value={search}
//                                       onValueChange={setSearch}
//                                       autoFocus
//                                   />
//                                   <CommandList
//                                       className="max-h-60 overflow-auto"
//                                       onWheel={onWheel}
//                                   >
//                                       <CommandEmpty>No items found.</CommandEmpty>
//                                       <CommandGroup>
//                                           {filteredItems.map((item) => {
//                                               const isSelected = selectedItems.includes(item.value);
//                                               return (
//                                                   <CommandItem
//                                                       value={item.label ?? ""}
//                                                       key={item.value}
//                                                       onSelect={() => toggleItem(item.value)}
//                                                   >
//                                                       {item.label}
//                                                       <Check
//                                                           className={cn(
//                                                               "ml-auto",
//                                                               isSelected ? "opacity-100" : "opacity-0"
//                                                           )}
//                                                       />
//                                                   </CommandItem>
//                                               );
//                                           })}
//                                       </CommandGroup>
//                                   </CommandList>
//                               </Command>
//                           </PopoverContent>
//                       </Popover>
//                       {formDescription && (
//                           <FormDescription>{formDescription}</FormDescription>
//                       )}
//                       <FormMessage />
//                   </FormItem>
//               );
//           }}
//       />
//   );
// }
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "../../../shadcn/form";
import { useState, useEffect, useRef, useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../shadcn/popover";
import { Button } from "../../../shadcn/button";
import { cn } from "../../../utils/cn";
import { ChevronsUpDown, X } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../../shadcn/command";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../shadcn/tooltip";
import { Checkbox } from "../../../shadcn/checkbox";
export function FormMultiComboboxInput({ formControl, name, label, placeholder, formDescription, items = [], disabled, onSelect, defaultValue = [], defaultOptions = 2, }) {
    const [search, setSearch] = useState("");
    const containerRef = useRef(null);
    // Removed triggerRef and popoverWidth state, as we'll rely on CSS variables for sizing
    // Filter items based on search
    const filteredItems = items
        .filter((item) => { var _a; return (_a = item.label) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(search.toLowerCase()); })
        .sort((a, b) => { var _a, _b; return ((_a = a === null || a === void 0 ? void 0 : a.label) !== null && _a !== void 0 ? _a : "").localeCompare((_b = b === null || b === void 0 ? void 0 : b.label) !== null && _b !== void 0 ? _b : ""); });
    return (_jsx(FormField, { control: formControl, name: name, render: ({ field }) => {
            useEffect(() => {
                if ((field.value === undefined || field.value === null) &&
                    defaultValue.length > 0) {
                    field.onChange(defaultValue);
                }
            }, [defaultValue, field]);
            const selectedItems = field.value || [];
            const [visibleCount, setVisibleCount] = useState(selectedItems.length);
            const calculateVisibleItems = useCallback(() => {
                const container = containerRef.current;
                if (!container)
                    return visibleCount;
                const children = Array.from(container.children);
                let availableWidth = container.offsetWidth;
                let usedWidth = 0;
                let fitCount = 0;
                for (const child of children) {
                    const childWidth = child.offsetWidth + 4; // gap/margin
                    if (usedWidth + childWidth <= availableWidth) {
                        usedWidth += childWidth;
                        fitCount++;
                    }
                    else {
                        break;
                    }
                }
                return fitCount;
            }, [visibleCount]);
            useEffect(() => {
                const container = containerRef.current;
                if (!container)
                    return;
                let animationFrameId = null;
                const resizeObserver = new ResizeObserver(() => {
                    if (animationFrameId)
                        cancelAnimationFrame(animationFrameId);
                    animationFrameId = requestAnimationFrame(() => {
                        const newVisibleCount = calculateVisibleItems();
                        setVisibleCount((prevVisibleCount) => {
                            if (prevVisibleCount !== newVisibleCount) {
                                return newVisibleCount;
                            }
                            return prevVisibleCount;
                        });
                    });
                });
                resizeObserver.observe(container);
                setVisibleCount(calculateVisibleItems());
                return () => {
                    if (animationFrameId)
                        cancelAnimationFrame(animationFrameId);
                    resizeObserver.disconnect();
                };
            }, [calculateVisibleItems]);
            const toggleItem = (value) => {
                let updatedItems;
                if (selectedItems.includes(value)) {
                    updatedItems = selectedItems.filter((v) => v !== value);
                }
                else {
                    updatedItems = [...selectedItems, value];
                }
                field.onChange(updatedItems);
                onSelect && onSelect(updatedItems);
            };
            const onWheel = (e) => {
                const el = e.currentTarget;
                el.scrollTop += e.deltaY;
                e.preventDefault();
            };
            return (_jsxs(FormItem, { children: [label && _jsx(FormLabel, { children: label }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, className: "w-full", children: _jsx(FormControl, { children: _jsxs(Button
                                    // Removed ref={triggerRef} here as it's no longer needed for explicit width measurement
                                    , { 
                                        // Removed ref={triggerRef} here as it's no longer needed for explicit width measurement
                                        variant: "outline", role: "combobox", className: cn("justify-between", !selectedItems.length && "text-foreground/50"), disabled: disabled === true || (disabled && disabled(...arguments)), children: [selectedItems.length > 0 ? (_jsx(TooltipProvider, { children: _jsxs("div", { ref: containerRef, className: "flex flex-wrap gap-2 items-center overflow-hidden", children: [selectedItems.slice(0, defaultOptions).map((value) => {
                                                            var _a;
                                                            const label = ((_a = items.find((item) => item.value === value)) === null || _a === void 0 ? void 0 : _a.label) ||
                                                                value;
                                                            return (_jsxs("span", { className: "flex items-center px-2 py-1 bg-secondary text-secondary-foreground rounded-md truncate max-w-full", title: label, children: [_jsx("span", { className: "truncate max-w-[120px]", children: label }), _jsx("span", { role: "button", tabIndex: 0, onClick: (e) => {
                                                                            e.stopPropagation();
                                                                            const updated = selectedItems.filter((v) => v !== value);
                                                                            field.onChange(updated);
                                                                            onSelect && onSelect(updated);
                                                                        }, onKeyDown: (e) => {
                                                                            if (e.key === "Enter" || e.key === " ") {
                                                                                e.preventDefault();
                                                                                e.stopPropagation();
                                                                                const updated = selectedItems.filter((v) => v !== value);
                                                                                field.onChange(updated);
                                                                                onSelect && onSelect(updated);
                                                                            }
                                                                        }, className: "ml-1 text-muted-foreground hover:text-destructive cursor-pointer outline-none", children: _jsx(X, { className: "w-3 h-3 ml-1" }) })] }, value));
                                                        }), selectedItems.length > defaultOptions && (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs("span", { className: "px-2 py-1 bg-secondary text-secondary-foreground rounded-md cursor-pointer", children: ["+", selectedItems.length - defaultOptions, " more"] }) }), _jsx(TooltipContent, { className: "max-w-xs break-words", children: _jsx("div", { onWheel: onWheel, className: "flex flex-col gap-1 max-h-[200px] overflow-auto", children: selectedItems.slice(defaultOptions).map((value) => {
                                                                            var _a;
                                                                            return (_jsx("span", { className: "text-sm", children: ((_a = items.find((item) => item.value === value)) === null || _a === void 0 ? void 0 : _a.label) || value }, value));
                                                                        }) }) })] }))] }) })) : (placeholder), _jsx(ChevronsUpDown, { className: "opacity-50" })] }) }) }), _jsx(PopoverContent, { id: "multiSelectPopover", 
                                // New and improved width logic for PopoverContent
                                className: "p-0 min-w-[--radix-popover-trigger-width]" // Ensures at least trigger width
                                , style: {
                                    width: 'max-content', // Allow to grow with content
                                    maxWidth: 'min(500px, 90vw)' // Cap at 500px or 90% of viewport width, whichever is smaller
                                }, align: "start", children: _jsxs(Command, { id: "commandPopover", children: [_jsx(CommandInput, { placeholder: "Search...", value: search, onValueChange: setSearch, autoFocus: true }), _jsxs(CommandList, { className: "max-h-60 overflow-auto", onWheel: onWheel, children: [_jsx(CommandEmpty, { children: "No items found." }), _jsx(CommandGroup, { children: filteredItems.map((item) => {
                                                        var _a;
                                                        const isSelected = selectedItems.includes(item.value);
                                                        return (_jsxs(CommandItem, { value: (_a = item.label) !== null && _a !== void 0 ? _a : "", onSelect: () => toggleItem(item.value), className: "flex items-center space-x-2 justify-start", children: [_jsx(Checkbox, { checked: isSelected, onCheckedChange: () => toggleItem(item.value), onClick: (e) => e.stopPropagation() }), _jsx("span", { children: item.label })] }, item.value));
                                                    }) })] })] }) })] }), formDescription && (_jsx(FormDescription, { children: formDescription })), _jsx(FormMessage, {})] }));
        } }));
}
