import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "../../shadcn/card";
import { icons, LoaderCircle } from "lucide-react";
const LUCID_ICONS = icons;
export function SimpleWidget({ title, iconName, iconSize, iconClass, primaryText, secondaryText, mainClassName = '', loading, loadingMessage }) {
    let IconComponent = null;
    if (iconName) {
        IconComponent = LUCID_ICONS[iconName];
    }
    iconSize = iconSize === undefined ? 20 : iconSize;
    iconClass = iconClass !== null && iconClass !== void 0 ? iconClass : '';
    loadingMessage = loadingMessage !== null && loadingMessage !== void 0 ? loadingMessage : 'Loading...';
    return (_jsx(Card, { className: mainClassName, children: _jsxs(CardContent, { className: 'p-5', children: [_jsxs("div", { className: 'flex items-center justify-between gap-4', children: [_jsx("span", { children: title }), loading ? (_jsx(LoaderCircle, { size: iconSize, className: 'animate-spin ' + iconClass })) : (IconComponent && _jsx(IconComponent, { size: iconSize, className: iconClass }))] }), _jsx("div", { className: 'mt-6 text-2xl font-semibold', children: loading ? '...' : primaryText }), secondaryText && (_jsx("small", { className: 'mt-2 text-gray-400', children: loading ? loadingMessage : secondaryText }))] }) }));
}
