"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlignJustify } from "lucide-react";
import { Tabs } from "../tabs";
import { NoDataComponent } from "../no-data";
import { UploadTab } from "../upload-tab";
import { SheetComponent } from "../sheet";
export function ActivitySheet({ activityLogs = [] }) {
    const tabArray = [
        {
            tabName: "Activity",
            tabId: "tab-activity",
            default: true,
            tabContent: _jsx("div", { className: "overflow-auto flex flex-col gap-2 h-full", children: activityLogs.length > 0 ? (activityLogs.map((log) => (_jsxs("div", { className: "border-b text-sm pb-2", children: [_jsx("p", { className: "font-medium pb-1", children: log.activity }), _jsxs("p", { className: "text-gray-500 pb-1", children: ["Updated On:", " ", _jsx("span", { className: "text-gray-700", children: new Date(log.updatedOn).toLocaleString() })] }), _jsxs("p", { className: "text-gray-500 pb-1", children: ["Updated By: ", _jsx("span", { className: "text-gray-700", children: log.updatedBy })] })] }, log.id)))) : (_jsx(NoDataComponent, { text: "No Activity Logs Available" })) })
        }, {
            tabName: "File Upload",
            tabId: "tab-upload",
            default: false,
            tabContent: _jsx(UploadTab, {})
        }
    ];
    return (_jsx(SheetComponent, { buttonText: "", buttonIcon: _jsx(AlignJustify, {}), sheetTitle: "", sheetContent: _jsx(Tabs, { tabArray: tabArray, tabListClass: '' }), closeButton: true }));
}
