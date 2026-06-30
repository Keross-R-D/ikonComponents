"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../../shadcn/sidebar";
import { NavMain } from "./nav-main";
import { useSidebarNav } from "./SidebarNavContext";
import { useSidebarExpanded } from "./sidebar-expanded-context";
import { cn } from "../../utils/cn";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { navItems, header, footer } = useSidebarNav();
  const expanded = useSidebarExpanded();
  if (!navItems || navItems.length === 0) {
    return null;
  }


  return (
    <Sidebar
      className={cn(
        "transition-[margin] duration-200 ease-in-out",
        expanded ? "ml-56" : "ml-12"
      )}
      collapsible={"offcanvas"}
      {...props}
    >
      {header && <SidebarHeader>
        {header}
      </SidebarHeader>}
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      {footer && <SidebarFooter>
        {footer}
      </SidebarFooter>}
      <SidebarRail />
    </Sidebar>
  );
}