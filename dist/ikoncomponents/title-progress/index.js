import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Progress } from "../../shadcn/progress";
export function TitleProgress({ title, value, valueText, isPercent = true, className, titleClassName, valueClassName, progressClassName }) {
    let finalValue = value.toFixed(2);
    const parts = finalValue.split('.');
    if (parts[1] === '00') {
        finalValue = parts[0];
    }
    return (_jsxs("div", { className: 'w-full ' + (className !== null && className !== void 0 ? className : ''), children: [_jsxs("div", { className: 'flex items-center justify-between gap-4', children: [_jsx("div", { className: 'text-muted-foreground text-sm ' + (titleClassName !== null && titleClassName !== void 0 ? titleClassName : ''), children: title }), _jsx("div", { className: 'text-sm ' + (valueClassName !== null && valueClassName !== void 0 ? valueClassName : ''), children: valueText !== null && valueText !== void 0 ? valueText : `${finalValue}${isPercent ? '%' : ''}` })] }), _jsx(Progress, { value: value, className: 'w-full mt-2 ' + (progressClassName !== null && progressClassName !== void 0 ? progressClassName : '') })] }));
}
