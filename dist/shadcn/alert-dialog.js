"use client";
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
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "../utils/cn";
import { buttonVariants } from "./button";
// ✅ Root (NO ref here!)
const AlertDialog = (props) => _jsx(AlertDialogPrimitive.Root, Object.assign({ "data-slot": "alert-dialog" }, props));
AlertDialog.displayName = "AlertDialog";
// ✅ Trigger
const AlertDialogTrigger = React.forwardRef((props, ref) => (_jsx(AlertDialogPrimitive.Trigger, Object.assign({ "data-slot": "alert-dialog-trigger", ref: ref }, props))));
AlertDialogTrigger.displayName = "AlertDialogTrigger";
// ✅ Portal (NO ref here!)
const AlertDialogPortal = (props) => _jsx(AlertDialogPrimitive.Portal, Object.assign({ "data-slot": "alert-dialog-portal" }, props));
AlertDialogPortal.displayName = "AlertDialogPortal";
// ✅ Overlay
const AlertDialogOverlay = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(AlertDialogPrimitive.Overlay, Object.assign({ ref: ref, "data-slot": "alert-dialog-overlay", className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out " +
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
            "fixed inset-0 z-50 bg-black/50", className) }, props)));
});
AlertDialogOverlay.displayName = "AlertDialogOverlay";
// ✅ Content
const AlertDialogContent = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsxs(AlertDialogPortal, { children: [_jsx(AlertDialogOverlay, {}), _jsx(AlertDialogPrimitive.Content, Object.assign({ ref: ref, "data-slot": "alert-dialog-content", className: cn("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out " +
                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
                    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
                    "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] " +
                    "translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 " +
                    "shadow-lg duration-200 sm:max-w-lg", className) }, props))] }));
});
AlertDialogContent.displayName = "AlertDialogContent";
// ✅ Header
const AlertDialogHeader = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("div", Object.assign({ ref: ref, "data-slot": "alert-dialog-header", className: cn("flex flex-col gap-2 text-center sm:text-left", className) }, props)));
});
AlertDialogHeader.displayName = "AlertDialogHeader";
// ✅ Footer
const AlertDialogFooter = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("div", Object.assign({ ref: ref, "data-slot": "alert-dialog-footer", className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className) }, props)));
});
AlertDialogFooter.displayName = "AlertDialogFooter";
// ✅ Title
const AlertDialogTitle = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(AlertDialogPrimitive.Title, Object.assign({ ref: ref, "data-slot": "alert-dialog-title", className: cn("text-lg font-semibold bg-background", className) }, props)));
});
AlertDialogTitle.displayName = "AlertDialogTitle";
// ✅ Description
const AlertDialogDescription = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(AlertDialogPrimitive.Description, Object.assign({ ref: ref, "data-slot": "alert-dialog-description", className: cn("text-muted-foreground text-sm bg-background", className) }, props)));
});
AlertDialogDescription.displayName = "AlertDialogDescription";
// ✅ Action
const AlertDialogAction = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(AlertDialogPrimitive.Action, Object.assign({ ref: ref, className: cn(buttonVariants(), className) }, props)));
});
AlertDialogAction.displayName = "AlertDialogAction";
// ✅ Cancel
const AlertDialogCancel = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(AlertDialogPrimitive.Cancel, Object.assign({ ref: ref, className: cn(buttonVariants({ variant: "outline" }), "bg-background", className) }, props)));
});
AlertDialogCancel.displayName = "AlertDialogCancel";
// ✅ Exports
export { AlertDialog, AlertDialogTrigger, AlertDialogPortal, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, };
