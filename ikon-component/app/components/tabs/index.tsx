import { useEffect, useState } from "react";
import type { TabArray, TabProps } from "./type";
import { useIsMobile } from "../../shadcn/hooks/use-mobile";
import { Tabs as TabsComp, TabsContent, TabsList, TabsTrigger } from "../../shadcn/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../shadcn/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { TextButton } from "../buttons";

export default function Tabs({
  children,
  tabArray,
  tabListClass = "",
  tabListInnerClass = "",
  tabListButtonClass = "",
  tabContentClass = "",
  headerEndComponent,
  onTabChange,
  isSeperatePage = false,
}: TabProps) {
  const [itemToDisplay, setItemToDisplay] = useState<number>(5);
  const isMobile = useIsMobile(); // Or replace with window.matchMedia
  const [visibleTabs, setVisibleTabs] = useState<TabArray[]>([]);
  const [groupedTabs, setGroupedTabs] = useState<TabArray[]>([]);
  const [activeTab, setActiveTab] = useState<string>(
    tabArray.find((tab) => tab.default)?.tabId || tabArray[0]?.tabId || ""
  );

  useEffect(() => {
    setItemToDisplay(isMobile ? 2 : 5);
  }, [isMobile]);

  useEffect(() => {
    if (isSeperatePage) {
      const lastPath = window.location.pathname.split("/").pop() || "";
      setActiveTab(lastPath);
    }
  }, [isSeperatePage]);

  useEffect(() => {
    setVisibleTabs(tabArray.slice(0, itemToDisplay));
    setGroupedTabs(tabArray.slice(itemToDisplay));
  }, [tabArray, itemToDisplay]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const handleGroupedTabSelect = (tab: TabArray) => {
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

  return (
    <TabsComp
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full h-full flex flex-col"
    >
      <TabsList className={`flex justify-between items-center ${tabListClass}`}>
        <div className={`${tabListInnerClass}`}>
          {visibleTabs.map((tab) => (
            <TabsTrigger
              key={tab.tabId}
              value={tab.tabId}
              className={tabListButtonClass}
            >
              {tab.tabName}
            </TabsTrigger>
          ))}
          {groupedTabs.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TextButton variant="outline" size="sm" className="mt-1">
                  <EllipsisVertical />
                </TextButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {groupedTabs.map((tab) => (
                  <DropdownMenuItem
                    key={tab.tabId}
                    onClick={() => handleGroupedTabSelect(tab)}
                  >
                    {tab.tabName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {headerEndComponent && <div>{headerEndComponent}</div>}
      </TabsList>

      {children ? (
        <TabsContent
          value={activeTab}
          className={`mt-3 flex-grow overflow-auto h-full w-full ${tabContentClass}`}
        >
          {children}
        </TabsContent>
      ) : (
        tabArray.map((tab) => (
          <TabsContent
            value={tab.tabId}
            key={tab.tabId}
            className={`mt-3 flex-grow overflow-auto h-full w-full ${tabContentClass}`}
          >
            {tab?.tabContent}
          </TabsContent>
        ))
      )}
    </TabsComp>
  );
}
