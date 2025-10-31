"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "../../shadcn/sidebar";
import { NavMain } from "./nav-main";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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