"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "../../shadcn/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { IconButtonWithTooltip } from "../buttons";
export function ActionMenu({ actionMenus, extraActionParams, }) {
    const renderMenuItems = (items) => {
        items = items.filter((item) => {
            // biome-ignore lint/complexity/useOptionalChain: <explanation>
            return ((item === null || item === void 0 ? void 0 : item.visibility) === undefined || item.visibility === true || (item.visibility && item.visibility(...((extraActionParams === null || extraActionParams === void 0 ? void 0 : extraActionParams.arguments) || []))));
        });
        if (items.length === 0) {
            return _jsx(DropdownMenuItem, { className: "text-center", children: "No action available." });
        }
        return items.map((item, index) => {
            if (item.type === "label") {
                return _jsx(DropdownMenuLabel, { children: String(item.label) }, index);
            }
            if (item.type === "separator") {
                return _jsx(DropdownMenuSeparator, {}, index);
            }
            if (item.type === "group" && item.items) {
                return (_jsx(DropdownMenuGroup, { children: renderMenuItems(item.items) }, index));
            }
            if (item.items) {
                return (_jsxs(DropdownMenuSub, { children: [_jsx(DropdownMenuSubTrigger, { children: String(item.label) }), _jsx(DropdownMenuPortal, { children: _jsx(DropdownMenuSubContent, { children: renderMenuItems(item.items) }) })] }, index));
            }
            let labelContent = "";
            if (typeof item.label === "function") {
                labelContent = item.label(...((extraActionParams === null || extraActionParams === void 0 ? void 0 : extraActionParams.arguments) || []));
            }
            else {
                labelContent = item.label;
            }
            return (_jsxs(DropdownMenuItem, { disabled: item.disabled, onClick: () => 
                // biome-ignore lint/complexity/useOptionalChain: <explanation>
                item.onClick &&
                    item.onClick(...((extraActionParams === null || extraActionParams === void 0 ? void 0 : extraActionParams.arguments) || [])), children: [item.icon && _jsx(item.icon, {}), labelContent] }, index));
        });
    };
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(IconButtonWithTooltip, { variant: "ghost", tooltipContent: "Actions", className: "h-8 w-8 p-0 border-0 bg-transparent text-foreground keross:text-white elevation-0 shadow-none hover:bg-transparent", children: _jsx(MoreHorizontal, {}) }) }), _jsx(DropdownMenuContent, { className: "w-56", align: "end", children: renderMenuItems(actionMenus) })] }));
}
