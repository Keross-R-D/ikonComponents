"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs as TabsComp, TabsContent, TabsList, TabsTrigger, } from "../../shadcn/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../shadcn/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { TextButton } from "../buttons";
import { Card } from "../../shadcn/card";
import { useEffect, useState } from "react";
import { useIsMobile } from "../../hooks/use-mobile";
export function Tabs({ children, tabArray, pathName, tabListClass = "", tabListInnerClass = "", tabListButtonClass = "", tabContentClass = "", headerEndComponent, onTabChange, isSeperatePage = false, }) {
    var _a, _b;
    // const pathName = usePathname();
    const [itemToDisplay, setItemToDisplay] = useState(5);
    const isMobile = useIsMobile();
    const [visibleTabs, setVisibleTabs] = useState([]);
    const [groupedTabs, setGroupedTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(((_a = tabArray.find((tab) => tab.default)) === null || _a === void 0 ? void 0 : _a.tabId) || ((_b = tabArray[0]) === null || _b === void 0 ? void 0 : _b.tabId) || "");
    useEffect(() => {
        setItemToDisplay(isMobile ? 2 : 5);
    }, [isMobile]);
    useEffect(() => {
        if (pathName && isSeperatePage) {
            const lastPath = pathName.split("/").pop() || "";
            setActiveTab(lastPath);
        }
    }, [pathName, isSeperatePage]);
    useEffect(() => {
        setVisibleTabs(tabArray.slice(0, itemToDisplay));
        setGroupedTabs(tabArray.slice(itemToDisplay));
    }, [tabArray, itemToDisplay]);
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        onTabChange === null || onTabChange === void 0 ? void 0 : onTabChange(tabId);
    };
    const handleGroupedTabSelect = (tab) => {
        setVisibleTabs((prev) => {
            const updatedTabs = [...prev];
            const replacedTab = updatedTabs.pop();
            if (replacedTab) {
                setGroupedTabs((prevGrouped) => [
                    ...prevGrouped.filter((t) => t.tabId !== tab.tabId),
                    replacedTab,
                ]);
            }
            return [...updatedTabs, tab];
        });
        handleTabChange(tab.tabId);
    };
    return (_jsxs(TabsComp, { value: activeTab, onValueChange: handleTabChange, className: "w-full h-full flex flex-col", children: [_jsxs(TabsList, { className: `flex justify-between items-center ${tabListClass}`, children: [_jsxs("div", { className: `flex w-full ${tabListInnerClass}`, children: [visibleTabs.map((tab) => (_jsx(TabsTrigger, { value: tab.tabId, className: tabListButtonClass, children: tab.tabName }, tab.tabId))), groupedTabs.length > 0 && (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(TextButton, { variant: "outline", size: 'smIcon', className: "mt-1", children: _jsx(EllipsisVertical, {}) }) }), _jsx(DropdownMenuContent, { children: groupedTabs.map((tab) => (_jsx(DropdownMenuItem, { onClick: () => handleGroupedTabSelect(tab), children: tab.tabName }, tab.tabId))) })] }))] }), headerEndComponent && _jsx("div", { children: headerEndComponent })] }), children ? (_jsx(TabsContent, { value: activeTab, className: `mt-3 flex-grow overflow-auto h-full w-full ${tabContentClass}`, children: _jsx(Card, { className: "h-full w-full p-3", children: children }) })) : (tabArray.map((tab) => (_jsx(TabsContent, { value: tab.tabId, className: `mt-3 flex-grow overflow-auto h-full w-full ${tabContentClass}`, children: _jsx(Card, { className: "h-full w-full p-3", children: tab === null || tab === void 0 ? void 0 : tab.tabContent }) }, tab.tabId))))] }));
}
