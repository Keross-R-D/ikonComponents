/* eslint-disable max-lines */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Calendar } from './calendar';
import { ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons'; // Use these icons for the arrows in the header
import { Button } from './button';
const getDateAdjustedForTimezone = (dateInput) => {
    if (typeof dateInput === 'string') {
        const parts = dateInput.split('-').map((part) => parseInt(part, 10));
        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        return date;
    }
    else {
        return dateInput;
    }
};
/** The DateRangePicker component allows a user to select a range of dates */
export const DateRangePicker = ({ initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)), initialDateTo, onUpdate, align = 'center', locale = 'en-US' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [range, setRange] = useState({
        from: initialDateFrom
            ? getDateAdjustedForTimezone(initialDateFrom)
            : undefined,
        to: initialDateTo
            ? getDateAdjustedForTimezone(initialDateTo)
            : initialDateFrom
                ? getDateAdjustedForTimezone(initialDateFrom)
                : undefined
    });
    useEffect(() => {
        // This effect will be triggered when a date is selected.
        // We update the state of the component using the new range.
        if (onUpdate) {
            onUpdate({ range });
        }
    }, [range, onUpdate]);
    return (_jsxs(Popover, { modal: true, open: isOpen, onOpenChange: setIsOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { size: 'lg', variant: "secondary", className: "w-auto px-3 py-2", children: [_jsx("div", { className: "flex-grow text-left font-normal", children: _jsx("span", { children: "Select a date range" }) }), _jsx("div", { className: "pl-1 opacity-60 -mr-2 scale-125", children: isOpen ? _jsx(ChevronLeftIcon, { width: 24 }) : _jsx(ChevronRightIcon, { width: 24 }) })] }) }), _jsx(PopoverContent, { align: align, className: "w-auto p-0", children: _jsx(Calendar, { mode: "range", onSelect: (value) => {
                        setRange({ from: value === null || value === void 0 ? void 0 : value.from, to: value === null || value === void 0 ? void 0 : value.to });
                    }, selected: range, numberOfMonths: 2, defaultMonth: new Date(new Date().setMonth(new Date().getMonth() - 1)) }) })] }));
};
DateRangePicker.displayName = 'DateRangePicker';
DateRangePicker.filePath =
    'libs/shared/ui-kit/src/lib/date-range-picker/date-range-picker.tsx';
