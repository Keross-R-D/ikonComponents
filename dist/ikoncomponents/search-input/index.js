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
import { Input } from '../../shadcn/input';
import { cx } from 'class-variance-authority';
import { Search } from 'lucide-react';
export function SearchInput(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsxs("div", { className: "relative w-auto flex items-center", children: [_jsx(Search, { className: "absolute left-2 mr-2 h-4 w-4 shrink-0 opacity-50" }), _jsx(Input, Object.assign({ className: cx('pl-8 h-8', className) }, props))] }));
}
