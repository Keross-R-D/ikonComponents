import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "../../../shadcn/form";
import { Popover, PopoverContent, PopoverTrigger } from "../../../shadcn/popover";
import { Button } from "../../../shadcn/button";
import { cn } from "../../../utils/cn";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../../shadcn/calendar";
export function FormDateInput({ formControl, name, label, placeholder, dateFormat, calendarDateDisabled, formDescription, disabled, }) {
    return (_jsx(_Fragment, { children: _jsx(FormField, { control: formControl, name: name, render: ({ field }) => (_jsxs(FormItem, { children: [label && (_jsx(_Fragment, { children: _jsx(FormLabel, { children: label }) })), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, className: "w-full", children: _jsx(FormControl, { children: _jsxs(Button, { variant: "outline", className: cn(!field.value && "text-foreground/50"), disabled: disabled, children: [field.value ? (format(field.value, dateFormat || "PPP")) : (_jsx("span", { children: placeholder || "Pick a date" })), _jsx(CalendarIcon, { className: "ml-auto h-4 w-4 opacity-50" })] }) }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "single", selected: field.value, onSelect: field.onChange, disabled: calendarDateDisabled, 
                                    // disabled={(date) =>
                                    //   date > new Date() || date < new Date("1900-01-01")
                                    // }
                                    autoFocus: true }) })] }), formDescription && (_jsx(FormDescription, { children: formDescription })), _jsx(FormMessage, {})] })) }) }));
}
