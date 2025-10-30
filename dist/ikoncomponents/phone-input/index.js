var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../../shadcn/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../shadcn/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../shadcn/popover';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { countries } from 'countries-list';
import * as Flags from "country-flag-icons/react/3x2";
const Flag = ({ code }) => {
    const FlagComponent = Flags[code];
    return _jsx(FlagComponent, {});
};
export function PhoneInput(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [countryCode, setCountryCode] = useState("");
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", role: "combobox", "aria-expanded": open, className: "justify-between bg-secondary", children: [countryCode
                            ? _jsx(Flag, { code: countryCode })
                            : "...", _jsx(ChevronsUpDown, { className: "opacity-50" })] }) }), _jsx(PopoverContent, { className: "p-0", align: 'start', children: _jsxs(Command, { filter: (value, search, keywords = []) => {
                        const extendValue = value.toLowerCase() + ' ' + keywords.join(' ').toLowerCase();
                        if (extendValue.includes(search.toLowerCase()))
                            return 1;
                        return 0;
                    }, children: [_jsx(CommandInput, { placeholder: "Search ...", className: "h-9" }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No country found." }), _jsx(CommandGroup, { children: Object.entries(countries).map(([code, country]) => (country.phone.map((phone) => _jsxs(CommandItem, { value: `${phone}`, keywords: [country.name, "+" + phone.toString(), code], onSelect: (currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue);
                                            setCountryCode(code);
                                            setOpen(false);
                                        }, children: [_jsx(Flag, { code: code }), " ", country.name, " +", phone] }, phone)))) })] })] }) })] }));
}
