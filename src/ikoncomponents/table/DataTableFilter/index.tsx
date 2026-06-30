"use client";

import { useState, useMemo } from "react";
import { X, ChevronDown, Check, RotateCcw, Search, ListFilter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../shadcn/dropdown-menu";
import { Button } from "../../../shadcn/button";

export function DataTableFilter({ table }: { table: any }) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingColumns, setPendingColumns] = useState<string[]>([]);

  // Syncing with Table State: Which columns currently have a filter active?
  const activeFilters = table.getState().columnFilters;
  const activeIds = activeFilters.map((f: any) => f.id);

  const columns = table.getAllLeafColumns().filter((col: any) => col.getCanFilter());
  const filteredColumns = columns.filter((col: any) => {
    if (col.id === "DTActions")
      return false; // Exclude action column from filter list
    const label =
      (typeof col.columnDef.header === "string") ? col.columnDef.header : col.id;
    return label.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const togglePendingColumn = (id: string) => {
    setPendingColumns((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (o) setPendingColumns(activeIds);
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-2 border-border bg-background relative">
          <ListFilter className="w-4 h-4" />
          Filter
          {activeIds.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] rounded-full flex items-center justify-center font-bold">
              {activeIds.length}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-8 pl-8 pr-2 text-xs rounded-md border border-border bg-muted/20 focus:outline-none focus:ring-1 focus:ring-foreground/30"
          />
        </div>
        <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
          {filteredColumns.map((col: any) => {
            const label =
              typeof col.columnDef.header === "string"
                ? col.columnDef.header
                : col.id;
            const isSelected = pendingColumns.includes(col.id);

            return (
              <button
                key={col.id}
                onClick={() => togglePendingColumn(col.id)}
                className="flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-muted transition-colors"
              >
                <div
                  className="flex h-4 w-4 items-center justify-center rounded-sm border"
                  style={
                    isSelected
                      ? { backgroundColor: "hsl(var(--foreground))", borderColor: "hsl(var(--foreground))", color: "hsl(var(--background))" }
                      : { borderColor: "hsl(var(--border))" }
                  }
                >
                  {isSelected && <Check className="h-3 w-3" />}
                </div>
                <span className="truncate">{label}</span>
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
              columns.forEach((col: any) => {
                const wasActive = activeIds.includes(col.id);
                const willActive = pendingColumns.includes(col.id);
                if (willActive && !wasActive) col.setFilterValue([]);
                if (!willActive && wasActive) col.setFilterValue(undefined);
              });
              setOpen(false);
            }}
          >
            Apply
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 text-xs font-medium bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            onClick={() => {
              setPendingColumns([]);
              table.resetColumnFilters();
              setOpen(false);
            }}
          >
            <RotateCcw className="w-3.5 h-3.5 mr-2 inline" /> Reset
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function FilterTagSpacer({ activeFilters, table }: { activeFilters: any; table: any }) {
  if (!activeFilters || activeFilters.length === 0) return null;

  return (
    // {/* --- ACTIVE FILTER TAGS --- */}
    <div
      className="flex items-center gap-2 flex-1 min-w-0 overflow-x-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {activeFilters.map((filter: any) => (
        <FilterTag key={filter.id} filter={filter} table={table} />
      ))}
    </div>
  );
}

// --- INDIVIDUAL TAG COMPONENT WITH VALUE DROPDOWN ---
function FilterTag({ filter, table }: { filter: any; table: any }) {
  const [searchQuery, setSearchQuery] = useState("");
  const column = table.getColumn(filter.id);
  const colHeader =
    typeof column?.columnDef.header === "string" ? column.columnDef.header : filter.id;
  const selectedValues: any[] = filter.value || [];

  // Extract unique values from data
  const uniqueValues = useMemo(() => {
    const set = new Set();
    table.getPreFilteredRowModel().flatRows.forEach((row: any) => {
      const val = row.getValue(filter.id);
      if (val !== null && val !== undefined) set.add(val);
    });
    return Array.from(set).sort();
  }, [table.getPreFilteredRowModel().flatRows, filter.id]);

  const filteredValues = uniqueValues.filter((v: any) =>
    String(v).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleValue = (val: any) => {
    const next = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];
    column.setFilterValue(next);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 h-9 bg-muted/50 border border-border rounded-full text-xs font-medium cursor-pointer hover:bg-muted/80 transition-colors flex-1 shrink min-w-[140px] max-w-fit"
          title={`${colHeader}: ${selectedValues.length} Selected`}
        >
          <span className="uppercase truncate shrink font-semibold">{colHeader}:</span>
          <span className="text-muted-foreground whitespace-nowrap shrink-0">{selectedValues.length} Selected</span>
          <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-50 shrink-0" />
          <div
            className="p-0.5 ml-1 rounded-full hover:bg-background/80 shrink-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              column.setFilterValue(undefined);
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-8 pl-8 pr-2 text-xs rounded-md border border-border bg-muted/20 focus:outline-none focus:ring-1 focus:ring-foreground/30"
          />
        </div>
        <div className="space-y-1 max-h-[200px] overflow-y-auto pr-1">
          {filteredValues.map((val: any) => {
            const isSelected = selectedValues.includes(val);
            const label = String(val).trim() === "" ? "N/A" : String(val);
            return (
              <button
                key={String(val)}
                onClick={() => toggleValue(val)}
                className="flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-muted transition-colors"
              >
                <div
                  className="flex h-4 w-4 items-center justify-center rounded-sm border"
                  style={
                    isSelected
                      ? { backgroundColor: "hsl(var(--foreground))", borderColor: "hsl(var(--foreground))", color: "hsl(var(--background))" }
                      : { borderColor: "hsl(var(--border))" }
                  }
                >
                  {isSelected && <Check className="h-3 w-3" />}
                </div>
                <span className="truncate text-left">{label}</span>
              </button>
            );
          })}
          {filteredValues.length === 0 && (
            <div className="px-2 py-2 text-xs text-muted-foreground text-center">No items found.</div>
          )}
        </div>
        {selectedValues.length > 0 && (
          <div className="px-2 pt-1 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => column.setFilterValue([])}
            >
              Clear Selections
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
