"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";
import { redirect } from "next/navigation";
import { useBreadcrumb } from "./BreadcrumbProvider";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "../../shadcn/breadcrumb";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "../../shadcn/drawer";
import { Button } from "../../shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../shadcn/dropdown-menu";
import { useIsMobile } from "../../hooks/use-mobile";
export function AppBreadcrumb() {
    const { breadcrumbItems, backBreadcrumb } = useBreadcrumb();
    const [open, setOpen] = useState(false);
    const [itemToDisplay, setItemToDisplay] = useState(2);
    const isMobile = useIsMobile();
    useEffect(() => {
        if (isMobile) {
            setItemToDisplay(2);
        }
        else {
            setItemToDisplay(4);
        }
    }, [isMobile]);
    const breadcrumbObj = useMemo(() => {
        return {
            firstVisibleBreadcrumbList: breadcrumbItems.slice(0, 2),
            hiddenBreadcrumbList: isMobile
                ? breadcrumbItems.slice(2)
                : breadcrumbItems.slice(2, itemToDisplay),
            lastVisibleBreadcrumbList: breadcrumbItems.length > 2
                ? breadcrumbItems.slice(2 -
                    (breadcrumbItems.length < itemToDisplay
                        ? breadcrumbItems.length
                        : itemToDisplay))
                : [],
        };
    }, [breadcrumbItems, itemToDisplay, isMobile]);
    if (!breadcrumbObj || isMobile == undefined || itemToDisplay == null) {
        return null;
    }
    return (_jsx(Breadcrumb, { children: _jsxs(BreadcrumbList, { children: [breadcrumbObj.firstVisibleBreadcrumbList.map((item, index) => index < breadcrumbItems.length - 1 ? (_jsxs(Fragment, { children: [_jsx(BreadcrumbItem, { children: !item.href ? (_jsx(BreadcrumbPage, { className: "max-w-20 truncate md:max-w-none", children: item.title })) : (_jsx(BreadcrumbLink, { className: "max-w-20 truncate md:max-w-none cursor-pointer", onClick: () => {
                                    backBreadcrumb(item);
                                    redirect(item.href);
                                }, children: item.title })) }), _jsx(BreadcrumbSeparator, {}, "firstsep" + index)] }, "first" + index)) : (_jsx(BreadcrumbItem, { children: _jsx(BreadcrumbPage, { className: "max-w-20 truncate md:max-w-none", children: item.title }) }, "first" + index))), breadcrumbItems.length > itemToDisplay ? (_jsxs(_Fragment, { children: [_jsx(BreadcrumbItem, { children: !isMobile ? (_jsxs(DropdownMenu, { open: open, onOpenChange: setOpen, children: [_jsx(DropdownMenuTrigger, { className: "flex items-center gap-1", "aria-label": "Toggle menu", children: _jsx(BreadcrumbEllipsis, { className: "h-4 w-4" }) }), _jsx(DropdownMenuContent, { align: "start", children: breadcrumbObj.hiddenBreadcrumbList.map((item, index) => (_jsx(DropdownMenuItem, { children: !item.href ? (_jsx("span", { children: item.title })) : (_jsx(Link, { href: item.href ? item.href : "#", children: item.title })) }, index))) })] })) : (_jsxs(Drawer, { open: open, onOpenChange: setOpen, children: [_jsx(DrawerTrigger, { "aria-label": "Toggle Menu", children: _jsx(BreadcrumbEllipsis, { className: "h-4 w-4" }) }), _jsxs(DrawerContent, { children: [_jsxs(DrawerHeader, { className: "text-left", children: [_jsx(DrawerTitle, { children: "Navigate to" }), _jsx(DrawerDescription, { children: "Select a page to navigate to." })] }), _jsx("div", { className: "grid gap-1 px-2 lg:px-4", children: breadcrumbObj.hiddenBreadcrumbList.map((item, index) => (_jsx("div", { children: item.clickable == false ? (_jsx("span", { className: "py-1 text-sm", children: item.title })) : (_jsx(Link, { href: item.href ? item.href : "#", className: "py-1 text-sm", children: item.title })) }, index))) }), _jsx(DrawerFooter, { className: "pt-4", children: _jsx(DrawerClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Close" }) }) })] })] })) }), !isMobile && _jsx(BreadcrumbSeparator, {})] })) : null, !isMobile &&
                    breadcrumbObj.lastVisibleBreadcrumbList.map((item, index) => index == breadcrumbObj.lastVisibleBreadcrumbList.length - 1 ? (_jsx(BreadcrumbItem, { children: _jsx(BreadcrumbPage, { className: "max-w-20 truncate md:max-w-none cursor-pointer", children: item.title }) }, "last" + index)) : (_jsxs(Fragment, { children: [_jsx(BreadcrumbItem, { children: !item.href ? (_jsx(BreadcrumbPage, { className: "max-w-20 truncate md:max-w-none", children: item.title })) : (_jsx(BreadcrumbLink, { className: "max-w-20 truncate md:max-w-none cursor-pointer", onClick: () => {
                                        backBreadcrumb(item);
                                        redirect(item.href);
                                    }, children: item.title })) }), _jsx(BreadcrumbSeparator, {}, "lastsep" + index)] }, "last" + index)))] }, "BreadcrumbList1") }, "Breadcrumb1"));
}
export function RenderAppBreadcrumb({ breadcrumb, }) {
    const { addBreadcrumb } = useBreadcrumb();
    useEffect(() => {
        addBreadcrumb(breadcrumb);
    }, [breadcrumb]);
    return _jsx(_Fragment, {});
}
