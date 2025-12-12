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
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
export const LoadingSpinner = (_a) => {
    var { size = 48, className, visible = true } = _a, props = __rest(_a, ["size", "className", "visible"]);
    if (!visible)
        return null;
    return (_jsx("div", { className: "h-full w-full", children: _jsx("div", { className: "absolute inset-0 flex justify-center items-center z-50", children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", width: size, height: size }, props, { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: cn("animate-spin", className), children: _jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }) })) }) }));
};
