import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import React, { useEffect, useState } from 'react'
// import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover'
// import { Button } from '@/shadcn/ui/button'
// import { cn } from '@/shadcn/lib/utils'
// import { Check, ChevronsUpDown } from 'lucide-react'
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/shadcn/ui/command'
// interface MultiComboboxProps {
//   placeholder: string;
//   items: { value: string; label?: string }[];
//   onValueChange: (selectedItems: string[]) => void;
//   defaultValue?: string[];
// }
// export default function MultiCombobox({ placeholder, items, onValueChange, defaultValue }: MultiComboboxProps) {
//   const [selectedItems, setSelectedItems] = useState<string[]>(defaultValue ? defaultValue : []);
//   useEffect(() => {
//     onValueChange(selectedItems)
//   }, [selectedItems])
//   return (
//     <>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             className={cn(
//               "justify-between",
//               selectedItems.length == 0 && "text-muted-foreground"
//             )}
//           >
//             {selectedItems && selectedItems.length > 0 ? (
//               <div className='flex gap-2 items-center'>
//                 {
//                   selectedItems.map((value: string) => (
//                     <span
//                       key={value}
//                       className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md"
//                     >
//                       {
//                         (items.find(
//                           (item) => item.value === value
//                         )?.label || value)
//                       }
//                     </span>
//                   ))
//                 }
//               </div>
//             ) : placeholder}
//             <ChevronsUpDown className="opacity-50" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="p-0" align='start'>
//           <Command>
//             <CommandInput
//               placeholder="Search..."
//             />
//             <CommandList>
//               <CommandEmpty>No items found.</CommandEmpty>
//               <CommandGroup>
//                 {
//                   items.map((item) => {
//                     const isSelected = selectedItems.includes(item.value);
//                     return (
//                       <CommandItem
//                         value={item.value}
//                         key={item.value}
//                         onSelect={(value) => {
//                           let updatedItems;
//                           if (selectedItems.includes(value)) {
//                             updatedItems = selectedItems.filter((val) => val !== value);
//                           } else {
//                             updatedItems = [...selectedItems, value];
//                           }
//                           setSelectedItems(updatedItems);
//                         }}
//                       >
//                         {item?.label || item.value}
//                         <Check
//                           className={cn(
//                             "ml-auto",
//                             isSelected
//                               ? "opacity-100"
//                               : "opacity-0"
//                           )}
//                         />
//                       </CommandItem>
//                     )
//                   })
//                 }
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </>
//   )
// }
import { useEffect, useState, useRef, useCallback } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../shadcn/popover';
import { Button } from '../../shadcn/button';
import { cn } from '../../utils/cn';
import { ChevronsUpDown, X } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../shadcn/command';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../shadcn/tooltip';
import { Checkbox } from '../../shadcn/checkbox';
export function MultiCombobox({ placeholder, items, onValueChange, defaultValue, defaultOptions = 2 }) {
    const [selectedItems, setSelectedItems] = useState(defaultValue || []);
    const [search, setSearch] = useState("");
    const containerRef = useRef(null);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        onValueChange(selectedItems);
    }, [selectedItems, onValueChange]);
    const filteredItems = items
        .filter((item) => (item.label || item.value).toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => { var _a, _b; return ((_a = a === null || a === void 0 ? void 0 : a.label) !== null && _a !== void 0 ? _a : "").localeCompare((_b = b === null || b === void 0 ? void 0 : b.label) !== null && _b !== void 0 ? _b : ""); });
    const onWheel = (e) => {
        const el = e.currentTarget;
        el.scrollTop += e.deltaY;
        e.preventDefault();
    };
    const toggleItem = (value) => {
        const updatedItems = selectedItems.includes(value)
            ? selectedItems.filter((val) => val !== value)
            : [...selectedItems, value];
        setSelectedItems(updatedItems);
    };
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
            const childWidth = child.offsetWidth + 4; // Account for gap
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
                setVisibleCount((prevVisibleCount) => prevVisibleCount !== newVisibleCount ? newVisibleCount : prevVisibleCount);
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
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, className: "w-full", children: _jsxs(Button, { variant: "outline", role: "combobox", className: cn("justify-between px-3 py-2 h-10", selectedItems.length === 0 && "text-foreground/50", "bg-secondary"), onClick: () => setOpen((prev) => !prev), children: [selectedItems.length > 0 ? (_jsx(TooltipProvider, { children: _jsxs("div", { ref: containerRef, className: "flex flex-wrap gap-2 items-center overflow-hidden flex-1", children: [selectedItems.slice(0, defaultOptions).map((value) => {
                                        var _a;
                                        const label = ((_a = items.find((item) => item.value === value)) === null || _a === void 0 ? void 0 : _a.label) || value;
                                        return (_jsxs("span", { className: "flex items-center px-2 py-1 bg-secondary text-secondary-foreground rounded-md truncate max-w-full", title: label, children: [_jsx("span", { className: "truncate max-w-[120px]", children: label }), _jsx("span", { role: "button", tabIndex: 0, onClick: (e) => {
                                                        e.stopPropagation();
                                                        toggleItem(value);
                                                    }, onKeyDown: (e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            toggleItem(value);
                                                        }
                                                    }, className: "ml-1 text-muted-foreground hover:text-destructive cursor-pointer outline-none", children: _jsx(X, { className: "w-3 h-3 ml-1" }) })] }, value));
                                    }), selectedItems.length > defaultOptions && (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs("span", { className: "px-2 py-1 bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground keross:bg-secondary keross:text-secondary-foreground rounded-md cursor-pointer", children: ["+", selectedItems.length - defaultOptions, " more"] }) }), _jsx(TooltipContent, { className: "max-w-xs break-words", children: _jsx("div", { onWheel: onWheel, className: "flex flex-col gap-1 max-h-[200px] overflow-auto", children: selectedItems.slice(defaultOptions).map((value) => {
                                                        var _a;
                                                        return (_jsx("span", { className: "text-sm", children: ((_a = items.find((item) => item.value === value)) === null || _a === void 0 ? void 0 : _a.label) || value }, value));
                                                    }) }) })] }))] }) })) : (_jsx("span", { className: "flex-1 text-left truncate", children: placeholder })), _jsx(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })] }) }), _jsx(PopoverContent, { className: "p-0 min-w-[var(--radix-popover-trigger-width)]", style: { width: 'max-content', maxWidth: 'min(500px, 90vw)' }, align: "start", children: _jsxs(Command, { onMouseDown: (e) => e.preventDefault(), children: [_jsx(CommandInput, { placeholder: "Search...", value: search, onValueChange: setSearch }), _jsxs(CommandList, { onWheel: onWheel, className: "max-h-60 overflow-auto", children: [_jsx(CommandEmpty, { children: "No items found." }), _jsx(CommandGroup, { children: filteredItems.map((item) => {
                                        const isSelected = selectedItems.includes(item.value);
                                        const isDisabled = item.disabled === true || (typeof item.disabled === "function" && item.disabled(item));
                                        return (_jsxs(CommandItem, { value: item.label || item.value, disabled: isDisabled, onPointerDown: (e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }, onSelect: () => {
                                                if (!isDisabled) {
                                                    toggleItem(item.value);
                                                }
                                            }, className: cn("flex items-center justify-between space-x-2", isDisabled && "opacity-50 cursor-not-allowed"), children: [_jsx(Checkbox, { checked: isSelected, onCheckedChange: () => {
                                                        if (!isDisabled) {
                                                            toggleItem(item.value);
                                                        }
                                                    }, onClick: (e) => e.stopPropagation(), disabled: isDisabled }), _jsx("span", { className: "flex-grow text-left", children: (item === null || item === void 0 ? void 0 : item.label) || item.value })] }, item.value));
                                    }) })] })] }) })] }));
}
