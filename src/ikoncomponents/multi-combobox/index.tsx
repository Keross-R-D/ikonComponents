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



import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../shadcn/popover';
import { Button } from '../../shadcn/button';
import { cn } from '../../utils/cn';
import { ChevronsUpDown, X } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../../shadcn/command';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../../shadcn/tooltip';
import { Checkbox } from '../../shadcn/checkbox';

interface MultiComboboxProps {
  placeholder: string;
  items: { value: string; label?: string; disabled?: boolean | ((item: any) => boolean) }[];
  onValueChange: (selectedItems: string[]) => void;
  defaultValue?: string[];
  defaultOptions?: number;
}

export function MultiCombobox({
  placeholder,
  items,
  onValueChange,
  defaultValue,
  defaultOptions = 2
}: MultiComboboxProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>(defaultValue || []);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onValueChange(selectedItems);
  }, [selectedItems, onValueChange]);

  const filteredItems = items
    .filter((item) =>
      (item.label || item.value).toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""));

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.scrollTop += e.deltaY;
    e.preventDefault();
  };

  const toggleItem = (value: string) => {
    const updatedItems = selectedItems.includes(value)
      ? selectedItems.filter((val) => val !== value)
      : [...selectedItems, value];
    setSelectedItems(updatedItems);
  };

  const [visibleCount, setVisibleCount] = useState(selectedItems.length);

  const calculateVisibleItems = useCallback(() => {
    const container = containerRef.current;
    if (!container) return visibleCount;

    const children = Array.from(container.children) as HTMLElement[];

    let availableWidth = container.offsetWidth;
    let usedWidth = 0;
    let fitCount = 0;

    for (const child of children) {
      const childWidth = child.offsetWidth + 4; // Account for gap
      if (usedWidth + childWidth <= availableWidth) {
        usedWidth += childWidth;
        fitCount++;
      } else {
        break;
      }
    }
    return fitCount;
  }, [visibleCount]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number | null = null;

    const resizeObserver = new ResizeObserver(() => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const newVisibleCount = calculateVisibleItems();
        setVisibleCount((prevVisibleCount) =>
          prevVisibleCount !== newVisibleCount ? newVisibleCount : prevVisibleCount
        );
      });
    });

    resizeObserver.observe(container);
    setVisibleCount(calculateVisibleItems());

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [calculateVisibleItems]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between px-3 py-2 h-10", selectedItems.length === 0 && "text-foreground/50", "bg-secondary")}
          onClick={() => setOpen((prev) => !prev)}
        >
          {selectedItems.length > 0 ? (
            <TooltipProvider>
              <div ref={containerRef} className="flex flex-wrap gap-2 items-center overflow-hidden flex-1">
                {selectedItems.slice(0, defaultOptions).map((value) => {
                  const label = items.find((item) => item.value === value)?.label || value;
                  return (
                    <span
                      key={value}
                      className="flex items-center px-2 py-1 bg-secondary text-secondary-foreground rounded-md truncate max-w-full"
                      title={label}
                    >
                      <span className="truncate max-w-[120px]">{label}</span>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItem(value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleItem(value);
                          }
                        }}
                        className="ml-1 text-muted-foreground hover:text-destructive cursor-pointer outline-none"
                      >
                        <X className="w-3 h-3 ml-1" />
                      </span>
                    </span>
                  );
                })}
                {selectedItems.length > defaultOptions && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground keross:bg-secondary keross:text-secondary-foreground rounded-md cursor-pointer">
                        +{selectedItems.length - defaultOptions} more
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs break-words">
                      <div
                        onWheel={onWheel}
                        className="flex flex-col gap-1 max-h-[200px] overflow-auto"
                      >
                        {selectedItems.slice(defaultOptions).map((value) => (
                          <span key={value} className="text-sm">
                            {items.find((item) => item.value === value)?.label || value}
                          </span>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </TooltipProvider>
          ) : (
            <span className="flex-1 text-left truncate">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 min-w-[var(--radix-popover-trigger-width)]"
        style={{ width: 'max-content', maxWidth: 'min(500px, 90vw)' }}
        align="start"
      >
        <Command onMouseDown={(e) => e.preventDefault()}>
          <CommandInput
            placeholder="Search..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList onWheel={onWheel} className="max-h-60 overflow-auto">
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {filteredItems.map((item) => {
                const isSelected = selectedItems.includes(item.value);
                const isDisabled = item.disabled === true || (typeof item.disabled === "function" && item.disabled(item));
                return (
                  <CommandItem
                    key={item.value}
                    value={item.label || item.value}
                    disabled={isDisabled}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      if (!isDisabled) {
                        toggleItem(item.value);
                      }
                    }}
                    className={cn(
                      "flex items-center justify-between space-x-2",
                      isDisabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => {
                        if (!isDisabled) {
                          toggleItem(item.value);
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                      disabled={isDisabled}
                    />
                    <span className="flex-grow text-left">
                      {item?.label || item.value}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

