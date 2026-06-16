"use client";
import { TabArray, TabProps } from "./type";
import {
  Tabs as TabsComp,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../shadcn/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../shadcn/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { TextButton } from "../buttons";
import { Card } from "../../shadcn/card";
import React, { useEffect, useState } from "react";
import { useIsMobile } from "../../hooks/use-mobile";

export function CustomTabs({
  children,
  tabArray,
  pathName,
  tabListClass = "",
  tabListInnerClass = "",
  tabListButtonClass = "",
  tabContentClass = "",
  headerEndComponent,
  onTabChange,
  isSeperatePage = false,
}: TabProps) {
  const [itemToDisplay, setItemToDisplay] = useState<number>(5);
  const isMobile = useIsMobile();
  const [visibleTabs, setVisibleTabs] = useState<TabArray[]>([]);
  const [groupedTabs, setGroupedTabs] = useState<TabArray[]>([]);
  const [activeTab, setActiveTab] = useState<string>(
    tabArray.find((tab) => tab.default)?.tabId || tabArray[0]?.tabId || ""
  );

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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const handleGroupedTabSelect = (tab: TabArray) => {
    const replacedTab = visibleTabs[visibleTabs.length - 1];
    const newVisibleTabs = [...visibleTabs.slice(0, -1), tab];
    const newGroupedTabs = [
      ...groupedTabs.filter((t) => t.tabId !== tab.tabId),
      ...(replacedTab ? [replacedTab] : []),
    ];
    setVisibleTabs(newVisibleTabs);
    setGroupedTabs(newGroupedTabs);
    handleTabChange(tab.tabId);
  };

  return (
    <TabsComp
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full h-full flex flex-col"
    >
      {/* Outer row: tab strip + optional end component */}
      <div className={`flex items-center justify-between ${tabListClass}`}>

        {/* Bordered tab strip container */}
        <TabsList
          className={`
            h-auto bg-transparent p-0 border-0
            flex items-center
          `}
        >
          <div
            className={`
              flex items-center gap-0.5
              border border-border rounded-lg p-1
              ${tabListInnerClass}
            `}
          >
            {visibleTabs.map((tab) => (
              <TabsTrigger
                key={tab.tabId}
                value={tab.tabId}
                className={`
                  flex items-center gap-1.5
                  px-3 py-1.5 h-auto
                  text-sm font-medium rounded-md
                  text-muted-foreground
                  border border-transparent
                  bg-transparent shadow-none
                  hover:text-foreground hover:bg-muted
                  data-[state=active]:bg-accent
                  data-[state=active]:text-foreground
                  data-[state=active]:border-border
                  data-[state=active]:shadow-none
                  transition-all duration-150
                  ${tabListButtonClass}
                `}
              >
                {tab.icon && (
                  <span className="size-4 flex items-center justify-center shrink-0">
                    {tab.icon}
                  </span>
                )}
                {tab.tabName}
              </TabsTrigger>
            ))}

            {groupedTabs.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <TextButton variant="ghost" size="smIcon">
                    <EllipsisVertical className="size-4" />
                  </TextButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {groupedTabs.map((tab) => (
                    <DropdownMenuItem
                      key={tab.tabId}
                      onClick={() => handleGroupedTabSelect(tab)}
                      className="flex items-center gap-2"
                    >
                      {tab.icon && (
                        <span className="size-4 flex items-center justify-center shrink-0">
                          {tab.icon}
                        </span>
                      )}
                      {tab.tabName}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </TabsList>

        {headerEndComponent && <div>{headerEndComponent}</div>}
      </div>

      {/* Tab content */}
      {children ? (
        <TabsContent
          value={activeTab}
          className={`mt-3 flex-grow overflow-auto h-full w-full ${tabContentClass}`}
        >
          <Card className="h-full w-full p-3">{children}</Card>
        </TabsContent>
      ) : (
        tabArray.map((tab) => (
          <TabsContent
            value={tab.tabId}
            key={tab.tabId}
            className={`mt-3 flex-grow overflow-auto h-full w-full ${tabContentClass}`}
          >
            <Card className="h-full w-full p-3">{tab?.tabContent}</Card>
          </TabsContent>
        ))
      )}
    </TabsComp>
  );
}