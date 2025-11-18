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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { navItems } = useSidebarNav();
  if (!navItems || navItems.length === 0) {
    return null;
  }


  return (
    <Sidebar className="ml-12" collapsible={"offcanvas"} {...props}>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        {/* Add footer content if needed */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}