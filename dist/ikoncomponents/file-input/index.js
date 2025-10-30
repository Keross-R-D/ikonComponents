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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Input } from '../../shadcn/input';
import { IconButtonWithTooltip } from '../buttons';
export function FileInput(_a) {
    var { tooltipContent, fileNamePlaceholder, fileName, onFileNameChange } = _a, props = __rest(_a, ["tooltipContent", "fileNamePlaceholder", "fileName", "onFileNameChange"]);
    const inputRef = useRef(null);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: 'flex', children: [_jsx(Input, Object.assign({ ref: inputRef, type: "file", className: "hidden" }, props)), _jsx("div", { className: 'mx-1' }), _jsx(Input, { className: 'rounded-e-none', placeholder: fileNamePlaceholder, onChange: (...args) => onFileNameChange === null || onFileNameChange === void 0 ? void 0 : onFileNameChange(...args), value: fileName }), _jsx(IconButtonWithTooltip, { tooltipContent: tooltipContent || "Browse File", onClick: () => { var _a; return (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, className: 'border-s-0 rounded-s-none', children: _jsx(Upload, {}) })] }) }));
}
