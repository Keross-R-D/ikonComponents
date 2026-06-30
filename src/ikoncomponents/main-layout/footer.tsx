"use client"

import { Copyright } from "lucide-react"
import * as React from "react"
import { useSidebarExpanded } from "./sidebar-expanded-context"
import { cn } from "../../utils/cn"

export function Footer() {
  const expanded = useSidebarExpanded();
  return (
    <footer className={cn(
      "flex border-t px-4 py-2 justify-center lg:justify-start transition-[margin] duration-200 ease-in-out",
      expanded ? "ml-56" : "ml-12"
    )}>
      <div className="flex gap-2 items-center">
        <Copyright className="size-4" />
        <span>Powered By</span>
        <a href="https://keross.com" target="_blank">
          Keross
        </a>
        <span className="">|</span>
        <span id="txtCopyrightYear" className="">
          {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}

