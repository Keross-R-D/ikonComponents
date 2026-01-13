"use client"

import { ReactNode, useEffect, } from "react";
import { ChevronRight } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "../../shadcn/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "../../shadcn/collapsible";
import Link from "next/link";
import { SidebarNavItem, useSidebarNav } from "./SidebarNavContext";
import { set } from "date-fns";

export function NavMain() {
  const { navItems } = useSidebarNav();

  // if (!navItems || navItems.length === 0) {
  //   return null;
  // }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {navItems.map((item) =>
          item.items && item.items.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url} className="flex items-center gap-2 w-full">
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

// Helper component to set nav items from pages
export function RenderSidebarNav({ items, sidebarHeader, sidebarFooter }: { items: SidebarNavItem[], sidebarHeader?: ReactNode, sidebarFooter?: ReactNode }) {
  const { setNavItems,setSidebarHeader, setSidebarFooter } = useSidebarNav();


  useEffect(() => {
    setNavItems(items);
    setSidebarHeader(sidebarHeader);
    setSidebarFooter(sidebarFooter);
  }, [items, sidebarHeader, sidebarFooter, setNavItems, setSidebarHeader, setSidebarFooter]);

  return null;
}

// Helper component to add a single nav item
export function AddSidebarNav({ item }: { item: SidebarNavItem }) {
  const { addNavItem } = useSidebarNav();

  useEffect(() => {
    addNavItem(item);
  }, [item, addNavItem]);

  return null;
}
