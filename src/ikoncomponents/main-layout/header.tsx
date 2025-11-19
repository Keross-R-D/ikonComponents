
import { AppBreadcrumb } from "../app-breadcrumb";
import * as React from "react"

import { ThemeToggleBtn } from "../theme-toggle-btn";
import { Separator } from "../../shadcn/separator";
import { SidebarTrigger } from "../../shadcn/sidebar";
import { Bell, LayoutGrid, Play } from "lucide-react";
import { IconButton, IconButtonWithTooltip, IconTextButton } from "../buttons";
import { useSidebarNav } from "./SidebarNavContext";

export function Header() {

  const { navItems } = useSidebarNav();


  return (
    <header className="ml-12 flex h-12 border-b shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center justify-between gap-2 px-4 w-full">
        <div className="flex items-center gap-2">
          {(!navItems || navItems.length === 0) ? <div></div> : <SidebarTrigger className="-ml-1" />}
          {(!navItems || navItems.length === 0) ?
            <div></div> :
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          }

          <AppBreadcrumb />
        </div>
        <div className="ml-auto flex gap-4">
          <IconButton>
            <Bell />
          </IconButton>
          <ThemeToggleBtn />
          <IconTextButton
            variant={"default"}
          >
            <Play />
            App Store
          </IconTextButton>
          <IconButton>
            <LayoutGrid />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
