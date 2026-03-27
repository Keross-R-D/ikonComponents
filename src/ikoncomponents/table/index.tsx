import React, { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Reload } from "../reload-component";
import { DataTable} from "./DataTable";
import { DataTableSearch } from "./DataTableSearch";
import { DataTablePagination } from "./DataTablePagination";
import { DataTablePageSize } from "./DataTablePageSize";
import { DataTableLayoutProps } from "./type";


export function DataTableLayout<T>({
  data,
  columns,
  keyExtractor,
  totalPages,
  currentPage,
  filterComponent,
  actionNode,
  onRowClick,
  gridComponent,
  isLoading = false,
  onReload,
}: DataTableLayoutProps<T>) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <DataTableSearch />
          {filterComponent && filterComponent}
        </div>

        <div className="flex items-center gap-2">
          {actionNode && actionNode}
          <div className="flex items-center border border-border rounded-md bg-background overflow-hidden h-9">
            <button
              onClick={() => setViewMode("list")}
              className={`px-2.5 h-full flex items-center justify-center transition-colors ${viewMode === "list" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50"}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`px-2.5 h-full flex items-center justify-center transition-colors ${viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50"}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative min-h-[300px]">
        <Reload 
          isLoading={isLoading} 
          onReload={onReload || (() => window.location.reload())}
        />

        <div className={`transition-all duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
          {viewMode === "list" ? (
            <DataTable
              data={data}
              columns={columns}
              keyExtractor={keyExtractor}
              onRowClick={onRowClick}
            />
          ) : (
            (gridComponent ? gridComponent(data) : (
              <div className="p-12 text-center text-muted-foreground border border-border border-dashed rounded-md bg-muted/20">
                Grid view not implemented for this component yet.
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border mt-4">
        <DataTablePageSize />
        <DataTablePagination
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
