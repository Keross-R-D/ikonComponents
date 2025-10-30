import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button } from "../../shadcn/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../shadcn/sheet";
export function SheetComponent({ buttonText, buttonIcon, buttonStyle, sheetContent, sheetDescription, sheetTitle, closeButton }) {
    return (_jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsxs(Button, { variant: 'outline', className: buttonStyle, size: "smIcon", children: [buttonText, buttonIcon] }) }), _jsxs(SheetContent, { className: "p-4", children: [_jsx(SheetTitle, { children: sheetTitle }), sheetContent] })] }));
}
