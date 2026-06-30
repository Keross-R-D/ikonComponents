"use client";

import { Settings2, Check } from "lucide-react";
import { Button } from "../../../shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../../shadcn/dropdown-menu";

export function DataTableColumns({ table }: { table: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-2 border-border bg-background">
          <Settings2 className="w-4 h-4" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-2">
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Toggle Columns
        </div>
        {table.getAllLeafColumns().map((column: any) => {
          // Skip columns that don't have an ID or are special (like selection)
          if (!column.getCanHide()) return null;

          const headerText =
            typeof column.columnDef.header === "string"
              ? column.columnDef.header
              : column.id;
          const isVisible = column.getIsVisible();

          return (
            <button
              key={column.id}
              onClick={() => column.toggleVisibility(!isVisible)}
              className="flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-muted transition-colors capitalize"
            >
              <div className={`flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${isVisible ? "bg-primary text-primary-foreground" : "bg-transparent"}`}>
                {isVisible && <Check className="h-3 w-3" />}
              </div>
              <span className="truncate">{headerText}</span>
            </button>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
