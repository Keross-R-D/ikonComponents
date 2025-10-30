import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CircleAlert } from "lucide-react";
export function NoDataComponent({ text }) {
    return (_jsxs("div", { className: "flex flex-col h-full justify-center text-center gap-2", children: [_jsx(CircleAlert, { className: "text-muted-foreground mx-auto", size: 36 }), _jsx("p", { className: "text-muted-foreground", children: text ? text : "No Data Available" })] }));
}
