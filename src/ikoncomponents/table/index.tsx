import React, { useState, useEffect, useRef } from "react";
import { LayoutGrid, List, MoreHorizontal, ChevronRight, ChevronDown, X, GripVertical, Settings2, Check, Filter, Download, RotateCcw, Search, ListFilter } from "lucide-react";
import { Badge } from "../../shadcn/badge";
import { Reload } from "../reload-component";
import { DataTable } from "./DataTable";
import { DataTableSearch } from "./DataTableSearch";
import { DataTablePagination } from "./DataTablePagination";
import { DataTablePageSize } from "./DataTablePageSize";
import { DataTableLayoutProps } from "./type";
import { Button } from "../../shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../shadcn/dropdown-menu";


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
  themeColor = "hsl(var(--primary))",
  onLoadMore,
  hasMore = false,
  onFilterChange,
}: DataTableLayoutProps<T>) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewMode !== "grid" || !onLoadMore || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [viewMode, onLoadMore, hasMore]);
  const [groupedColumns, setGroupedColumns] = useState<string[]>([]);
  const [tableFilters, setTableFilters] = useState<{ [key: string]: string[] }>({});
  const [activeFilterColumns, setActiveFilterColumns] = useState<string[]>([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [pendingFilterColumns, setPendingFilterColumns] = useState<string[]>([]);
  const [filterSearchQuery, setFilterSearchQuery] = useState("");
  const [columnSearchQueries, setColumnSearchQueries] = useState<{ [key: string]: string }>({});
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map(col => typeof col.header === "string" ? col.header : "")
  );

  const toggleColumn = (header: string) => {
    setVisibleColumns(prev =>
      prev.includes(header) ? prev.filter(h => h !== header) : [...prev, header]
    );
  };

  const handleToggleFilterValue = (column: string, value: string) => {
    setTableFilters(prev => {
      const currentValues = prev[column] || [];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];

      const next = { ...prev };
      if (nextValues.length === 0) {
        delete next[column];
      } else {
        next[column] = nextValues;
      }
      return next;
    });
  };

  const removeActiveFilterColumn = (column: string) => {
    const nextActiveColumns = activeFilterColumns.filter(c => c !== column);
    const nextFilters = { ...tableFilters };
    delete nextFilters[column];

    setActiveFilterColumns(nextActiveColumns);
    setTableFilters(nextFilters);
    onFilterChange?.(nextFilters);
  };

  const handleTogglePendingFilterColumn = (column: string) => {
    setPendingFilterColumns(prev =>
      prev.includes(column) ? prev.filter(c => c !== column) : [...prev, column]
    );
  };

  const getUniqueValuesForColumn = (header: string) => {
    const col = columns.find(c => c.header === header);
    if (!col || !col.accessorKey) return [];
    const values = data.map(row => String((row as any)[col.accessorKey] || ""));
    return Array.from(new Set(values)).filter(Boolean).sort();
  };

  const handleToggleGroup = (columnHeader: string) => {
    setGroupedColumns(prev =>
      prev.includes(columnHeader)
        ? prev.filter(c => c !== columnHeader)
        : [...prev, columnHeader]
    );
  };

  const exportToCSV = () => {
    if (!data || data.length === 0) return;

    const headers = columns
      .filter(col => typeof col.header === "string")
      .map(col => col.header as string);

    const csvRows = data.map(row =>
      columns
        .filter(col => typeof col.header === "string")
        .map(col => {
          const val = col.accessorKey ? (row as any)[col.accessorKey] : "";
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(",")
    );

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `table-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // data is the current page from the backend — render it directly, no client-side filtering.

  return (
    <div className="space-y-4">
      {/* Top Header Row: Search, Filters, Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-2 w-full sm:w-auto sm:max-w-[200px] shrink-0">
          <DataTableSearch />
        </div>

        <div className="flex items-center gap-3 flex-wrap shrink-0">
          {actionNode && actionNode}

          {/* Filter Component */}
          {filterComponent && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-2 border-border bg-background">
                  <ListFilter className="w-4 h-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-4 min-w-[200px]">
                {filterComponent}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Filter Column Selector */}
          <DropdownMenu
            open={isFilterDropdownOpen}
            onOpenChange={(open) => {
              setIsFilterDropdownOpen(open);
              if (open) {
                setPendingFilterColumns(activeFilterColumns);
              }
            }}
          >
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2 border-border bg-background relative">
                <ListFilter className="w-4 h-4" />
                Filter
                {activeFilterColumns.length > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] rounded-full flex items-center justify-center font-bold"
                  >
                    {activeFilterColumns.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 space-y-2">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Filter
              </div>
              <div className="px-2 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search columns..."
                  value={filterSearchQuery}
                  onChange={(e) => setFilterSearchQuery(e.target.value)}
                  className="w-full h-8 pl-8 pr-2 text-xs rounded-md border border-border bg-muted/20 focus:outline-none focus:ring-1 focus:ring-foreground/30"
                />
              </div>
              <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
                {columns
                  .filter(col => {
                    const headerText = typeof col.header === "string" ? col.header : "";
                    return headerText && col.accessorKey && headerText.toLowerCase().includes(filterSearchQuery.toLowerCase());
                  })
                  .map((col, idx) => {
                    const headerText = typeof col.header === "string" ? col.header : "";
                    const isSelected = pendingFilterColumns.includes(headerText);

                    return (
                      <button
                        key={idx}
                        onClick={() => handleTogglePendingFilterColumn(headerText)}
                        className="flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-muted transition-colors"
                      >
                        <div
                          className={`flex h-4 w-4 items-center justify-center rounded-sm border`}
                          style={isSelected ? { backgroundColor: 'hsl(var(--foreground))', borderColor: 'hsl(var(--foreground))', color: 'hsl(var(--background))' } : { borderColor: 'hsl(var(--border))' }}
                        >
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                        <span className="truncate">{headerText}</span>
                      </button>
                    );
                  })}
              </div>
              <div className="px-2 pt-2 mt-1 flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 text-xs font-medium bg-foreground text-background hover:bg-foreground/90"
                  onClick={() => {
                    setActiveFilterColumns(pendingFilterColumns);
                    const removedColumns = activeFilterColumns.filter(c => !pendingFilterColumns.includes(c));
                    const nextFilters = { ...tableFilters };
                    removedColumns.forEach(c => delete nextFilters[c]);
                    setTableFilters(nextFilters);
                    setIsFilterDropdownOpen(false);
                    // Notify parent so it can re-fetch from the backend
                    onFilterChange?.(nextFilters);
                  }}
                >
                  Apply
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 text-xs font-medium bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  onClick={() => {
                    setPendingFilterColumns([]);
                    setActiveFilterColumns([]);
                    setTableFilters({});
                    setIsFilterDropdownOpen(false);
                    // Notify parent so it can re-fetch all data without filters
                    onFilterChange?.({});
                  }}
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-2 inline" /> Reset
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Column Toggle */}
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
              {columns.map((col, idx) => {
                const headerText = typeof col.header === "string" ? col.header : `Column ${idx + 1}`;
                const isVisible = visibleColumns.includes(headerText);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleColumn(headerText)}
                    className="flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-muted transition-colors"
                  >
                    <div className={`flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${isVisible ? 'bg-primary text-primary-foreground' : 'bg-transparent'}`}>
                      {isVisible && <Check className="h-3 w-3" />}
                    </div>
                    {headerText}
                  </button>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-2 border-border bg-background"
            onClick={exportToCSV}
          >
            <Download className="w-4 h-4" />

          </Button>

          {/* View Toggles */}
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


      {/* Active Filter Chips */}
      {activeFilterColumns.length > 0 && (
        <div
          className="flex items-center gap-2 flex-1 min-w-0 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {activeFilterColumns.map(colHeader => {
            const selectedCount = (tableFilters[colHeader] || []).length;
            const searchQuery = columnSearchQueries[colHeader] || "";
            const uniqueValues = getUniqueValuesForColumn(colHeader);
            const filteredValues = uniqueValues.filter(v => v.toLowerCase().includes(searchQuery.toLowerCase()));

            return (
              <DropdownMenu key={colHeader}>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 h-9 bg-muted/50 border border-border rounded-full text-xs font-medium cursor-pointer hover:bg-muted/80 transition-colors flex-1 shrink min-w-[140px] max-w-fit [&::-webkit-scrollbar]:hidden" title={`${colHeader}: ${selectedCount} Selected`}>
                    <span className="uppercase truncate shrink font-semibold">{colHeader}:</span>
                    <span className="text-muted-foreground whitespace-nowrap shrink-0">{selectedCount} Selected</span>
                    <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-50 shrink-0" />
                    <div
                      className="p-0.5 ml-1 rounded-full hover:bg-background/80 shrink-0"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeActiveFilterColumn(colHeader);
                      }}
                      onPointerDown={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <X className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 p-2 space-y-2">
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Filter {colHeader}
                  </div>
                  <div className="px-2 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setColumnSearchQueries(prev => ({ ...prev, [colHeader]: e.target.value }))}
                      className="w-full h-8 pl-8 pr-2 text-xs rounded-md border border-border bg-muted/20 focus:outline-none focus:ring-1 focus:ring-foreground/30"
                    />
                  </div>
                  <div className="space-y-1 max-h-[200px] overflow-y-auto pr-1">
                    {filteredValues.map(val => {
                      const isSelected = (tableFilters[colHeader] || []).includes(val);
                      return (
                        <button
                          key={val}
                          onClick={() => handleToggleFilterValue(colHeader, val)}
                          className="flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-muted transition-colors"
                        >
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded-sm border`}
                            style={isSelected ? { backgroundColor: 'hsl(var(--foreground))', borderColor: 'hsl(var(--foreground))', color: 'hsl(var(--background))' } : { borderColor: 'hsl(var(--border))' }}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                          </div>
                          <span className="truncate text-left">{val}</span>
                        </button>
                      );
                    })}
                    {filteredValues.length === 0 && (
                      <div className="px-2 py-2 text-xs text-muted-foreground text-center">No items found.</div>
                    )}
                  </div>
                  {(tableFilters[colHeader] || []).length > 0 && (
                    <div className="px-2 pt-1 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => setTableFilters(prev => { const next = { ...prev }; delete next[colHeader]; return next; })}
                      >
                        Clear Selections
                      </Button>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          })}
        </div>
      )}

      {/* Grouping Row */}
      <div
        className="w-full flex items-center gap-2 p-2 border border-dashed border-border rounded-lg bg-muted/20 min-h-[48px] transition-all hover:bg-muted/40 group shadow-sm"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const columnHeader = e.dataTransfer.getData("columnHeader");
          if (columnHeader && !groupedColumns.includes(columnHeader)) {
            handleToggleGroup(columnHeader);
          }
        }}
      >
        <div className="flex items-center gap-2 text-muted-foreground text-xs px-2 select-none border-r pr-4 mr-2 border-border/50">
          <GripVertical className="w-4 h-4 opacity-40" />
          <span className="font-semibold uppercase tracking-wider opacity-70">Grouping</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {groupedColumns.length === 0 ? (
            <div className="flex items-center gap-2 text-muted-foreground/60 text-sm italic py-1">
              <span>Drag column headers here to group your data...</span>
            </div>
          ) : (
            groupedColumns.map(col => (
              <Badge
                key={col}
                variant="secondary"
                className="gap-2 pl-3 pr-1.5 h-8 text-xs font-semibold bg-background border shadow-sm animate-in fade-in zoom-in duration-200"
              >
                {col}
                <button
                  onClick={() => handleToggleGroup(col)}
                  className="hover:bg-muted rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </Badge>
            ))
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="relative min-h-[300px] mt-2">
        <Reload
          isLoading={isLoading}
          onReload={onReload || (() => window.location.reload())}
        />

        <div className={`transition-all duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
          {viewMode === "list" ? (
            <DataTable
              data={data}
              columns={columns.filter(col =>
                typeof col.header === "string" ? visibleColumns.includes(col.header) : true
              )}
              keyExtractor={keyExtractor}
              onRowClick={onRowClick}
              groupedColumns={groupedColumns}
              onToggleGroup={handleToggleGroup}
            />
          ) : (
            <>
              {gridComponent ? gridComponent(data) : (
                <div className="p-12 text-center text-muted-foreground border border-border border-dashed rounded-md bg-muted/20">
                  Grid view not implemented for this component yet.
                </div>
              )}
              {viewMode === "grid" && hasMore && (
                <div ref={observerTarget} className="flex justify-center p-6 w-full">
                  <div className="w-6 h-6 border-2 rounded-full animate-spin border-foreground border-t-transparent" />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {viewMode === "list" && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border mt-4">
          <DataTablePageSize />
          <DataTablePagination
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
}
