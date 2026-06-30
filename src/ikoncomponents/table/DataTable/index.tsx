"use client";

import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";
import type {
  SortingState,
  PaginationState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import * as XLSX from "xlsx";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, ChevronUp, Download, GripVertical, LayoutGrid, List, X } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "../../../shadcn/table";
import { Badge } from "../../../shadcn/badge";
import { Reload } from "../../reload-component";
import { DataTableSearch } from "../DataTableSearch";
import { DataTablePageSize } from "../DataTablePageSize";
import { DataTablePagination } from "../DataTablePagination";
import { DataTableFilter, FilterTagSpacer } from "../DataTableFilter";
import { DataTableColumns } from "../DataTableColumn";
import type {
  DataTableLayoutProps,
  FooterAggregate,
  FooterCellConfig,
  FooterOperation,
} from "../type";
import { Button } from "../../../shadcn/button";
import { ActionMenu } from "../../../ikoncomponents/action-menu";

// Assuming your converted components are in the same dire

/** Aggregate a single column's numeric values across the given rows. */
function aggregateRows(rows: any[], key: string, type: FooterAggregate): number {
  if (type === "count") return rows.length;
  const values = rows.map((r) => Number(r.original?.[key]) || 0);
  if (!values.length) return 0;
  switch (type) {
    case "sum":
      return values.reduce((a, b) => a + b, 0);
    case "avg":
      return values.reduce((a, b) => a + b, 0) / values.length;
    case "min":
      return Math.min(...values);
    case "max":
      return Math.max(...values);
    default:
      return 0;
  }
}

/** Combine the sums of several columns left-to-right with an arithmetic operation. */
function combineColumns(rows: any[], keys: string[], op: FooterOperation): number {
  const sums = keys.map((k) => aggregateRows(rows, k, "sum"));
  return sums.reduce((acc, val, i) => {
    if (i === 0) return val;
    switch (op) {
      case "add":
        return acc + val;
      case "subtract":
        return acc - val;
      case "multiply":
        return acc * val;
      case "divide":
        return val !== 0 ? acc / val : 0;
      default:
        return acc;
    }
  }, 0);
}

/** Resolve a footer cell definition to renderable content for the given column. */
function renderFooterCell(
  cell: FooterCellConfig<any> | undefined,
  rows: any[],
  columnId: string
): React.ReactNode {
  if (cell == null) return null;
  if (typeof cell === "string") return cell;
  if (cell.render) return cell.render(rows.map((r) => r.original));

  let value: number | null = null;
  if (cell.operation && cell.columns?.length) {
    value = combineColumns(rows, cell.columns, cell.operation);
  } else if (cell.aggregate) {
    value = aggregateRows(rows, cell.column ?? columnId, cell.aggregate);
  }
  if (value == null) return null;

  const formatted =
    cell.decimals != null ? value.toFixed(cell.decimals) : value.toLocaleString();
  return `${cell.prefix ?? ""}${formatted}${cell.suffix ?? ""}`;
}

export function DataTable<T>({
  data,
  columns,
  extraTools
}: DataTableLayoutProps<T>) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Sync State from URL
  const pageIndex = Number(searchParams.get("page") || "1") - 1;
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: extraTools?.pageIndex ?? 0,
    pageSize: extraTools?.pageSize ?? 10,
  });
  const [globalFilter, setGlobalFilter] = React.useState("");

  // 2. Internal UI States (Sorting, Grouping, Expanded)
  const [sorting, setSorting] = useState<SortingState>([]);
  const [grouping, setGrouping] = useState<string[]>(
    extraTools?.grouping ? extraTools?.groupedValue ?? [] : []
  );
  const [expanded, setExpanded] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const hiddenColumns = extraTools?.hiddenColumns || [];

  for (const col of columns) {
    if (col.filterFn === undefined) {
      col.filterFn = "multiSelect" as unknown as typeof col.filterFn; // Set default filter function to "multiSelect" if not provided
      // Make columns draggable by default
    }
    if (col.draggable === undefined) {
      col["draggable"] = true;
    }
  }

  if (extraTools?.actionMenu || extraTools?.groupActionMenu) {
    columns.push({
      id: "DTActions",
      accessorKey: "Actions",
      header: () => <div className="text-center">Action</div>,
      size: 20,
      headerClassName: "text-center",

      cell: ({ row }) => {
        if (row.getIsGrouped()) {
          return extraTools?.groupActionMenu ? (
            <div className="text-end">
              <ActionMenu
                actionMenus={extraTools.groupActionMenu.items}
                extraActionParams={{
                  arguments: [
                    row.original,
                    ...(extraTools.groupActionMenu.extraArguments || []),
                  ],
                }}
              />
            </div>
          ) : null;
        } else if (extraTools?.actionMenu) {
          return (
            <div className="text-center">
              <ActionMenu
                actionMenus={extraTools.actionMenu.items}
                extraActionParams={{
                  arguments: [
                    row.original,
                    ...(extraTools.actionMenu.extraArguments || []),
                  ],
                }}
              />
            </div>
          );
        } else {
          return null;
        }
      },
      enableSorting: false,
      enableHiding: false,
    });
  }

  // 3. Configure Table
  const table = useReactTable({
    data,
    columns,
    pageCount: extraTools?.totalPages,
    meta: {
      footerLabel: extraTools?.footerLabel,
    },
    state: {
      pagination: pagination,
      globalFilter,
      sorting,
      grouping,
      expanded,
      rowSelection,
      columnVisibility,
      columnFilters
    },
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,

    // Manual Mode for Server-Side Logic (URL-Driven)
    // When true, the parent supplies already-paged `data` + `totalPages` and the
    // table won't slice; when false/undefined it paginates the full data client-side.
    manualPagination: extraTools?.manualPagination ?? false,
    manualFiltering: false,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    filterFns: {
      // Custom filter to check if row value exists in selected array
      multiSelect: (row, columnId, filterValue) => {
        if (!filterValue.length) return true;
        return filterValue.includes(String(row.getValue(columnId)));
      },
    },
  });
  useEffect(() => {
    table.getAllLeafColumns().map((column) => {
      if (hiddenColumns?.includes(column.id)) {
        column.toggleVisibility(false);
      }
    });
  }, [hiddenColumns, table]);

  // 4. Drag & Drop Logic for Grouping (from your code)
  const handleDragStart = (e: React.DragEvent, headerId: string) => {
    e.dataTransfer.setData("headerId", headerId);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const headerId = e.dataTransfer.getData("headerId");
    if (headerId && !grouping.includes(headerId) && table.getColumn(headerId)?.getCanGroup()) {
      table.getColumn(headerId)?.toggleGrouping();
    }
  };

  useEffect(() => {
    // Sync globalFilter to URL when it changes
    table.setGlobalFilter(searchParams.get("search") || "");
  }, [searchParams, router, pathname]);

  useEffect(() => {
    table.setPageSize(Number(searchParams.get("size") || extraTools?.pageSize || 10));
    table.setPageIndex(
      Number(searchParams.get("page") || (extraTools?.pageIndex ?? 0) + 1) - 1
    );
  }, [searchParams, router, pathname]);

  // Notify the parent on page / page-size change so it can fetch from its API
  // (server-side / pageable mode). Harmless in client-side "all data" mode.
  useEffect(() => {
    extraTools?.onPaginationChange?.(pagination);
  }, [pagination.pageIndex, pagination.pageSize]);

  const handleExport = () => {
    // 1. Get only the columns that are currently visible in the UI
    const visibleColumns = table.getVisibleLeafColumns()
      .filter(col => col.id !== "select" && col.id !== "actions");

    // --- RECURSIVE FUNCTION ---
    const processRows = (rows: any, level = 0) => {
      return rows.flatMap((row: any) => {
        if (row.getIsGrouped()) {
          // 1. This is a Group Header Row
          const groupValue = String(row.id.replaceAll(`${visibleColumns[0].id}:`, "")).trim() === "" || row.id.replaceAll(`${row.parentId ? `${row.parentId}>` : ``}`, "").replaceAll(`${row.groupingColumnId}>`, "").replaceAll(`${visibleColumns[0].id}:`, "").trim() === undefined ? "N/A" : row.id.replaceAll(`${row.parentId ? `${row.parentId}>` : ``}`, "").replaceAll(`${visibleColumns[0].id}:`, "").trim();

          // Create the header row. We indent the text based on level for visual clarity in Excel.
          const headerRow = {
            [visibleColumns[0].id]: `${"  ".repeat(level)} ${groupValue} (${row.subRows.length})`
          };

          // 2. Recursively process the subRows (could be more groups or final data)
          return [headerRow, ...processRows(row.subRows, level + 1)];
        } else {
          // 3. This is an actual Data Row (Leaf)
          const rowData: Record<string, any> = {};
          visibleColumns.forEach((col) => {
            // Add indentation to the first column to show it belongs to the group above
            const value = row.getValue(col.id);
            rowData[col.id] = (col.id === visibleColumns[0].id) || (value === "Actions" || value === "actions")
              ? "    "// + (value ?? "")
              : value === undefined ? "N/A" : value; // Handle empty/undefined values
          });
          return [rowData];
        }
      });
    };

    // Decide which model to use based on your checkGrouping state
    const finalData = table.getState().grouping.length > 0
      ? processRows(table.getGroupedRowModel().rows)
      : table.getFilteredRowModel().rows.map(row => {
        const rowData: Record<string, any> = {};
        visibleColumns.forEach(col => rowData[col.id] = row.getValue(col.id));
        return rowData;
      });

    // 3. Create and download
    const worksheet = XLSX.utils.json_to_sheet(finalData);

    // 4. --- AUTO-SIZE COLUMN WIDTH LOGIC ---
    const colWidths = visibleColumns.map((col) => {
      const header = typeof col.columnDef.header === "string" ? col.columnDef.header : col.id;

      // Find the longest string in this column (header vs all row values)
      const maxCharLength = Math.max(
        header.length,
        ...finalData.map((row: any) => String(row[header]).length)
      );

      // Set width (adding 2 or 3 for extra padding/breathing room)
      return { wch: maxCharLength + 3 };
    });

    worksheet["!cols"] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    XLSX.writeFile(workbook, `${extraTools?.fileName}.xlsx`);
  };


  return (
    <div className="space-y-4">
      {/* Top Header Row: Search, Filters, Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-2 w-full sm:w-auto sm:max-w-[200px] shrink-0">
          <DataTableSearch />
        </div>

        <div className="flex items-center gap-3 flex-wrap shrink-0">
          {extraTools?.actionNode && extraTools?.actionNode}

          {/* Column Toggle */}
          {(viewMode === "list") &&
            (<>

              {/* Filter Column Selector */}
              <DataTableFilter table={table} />


              <DataTableColumns table={table} />

              {/* Export Button */}
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-2 border-border bg-background"
                onClick={() => handleExport()}
              >
                <Download className="w-4 h-4" />
              </Button></>)}

          {/* View Toggles */}
          {extraTools?.toggleViewMode && (
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
          )}
        </div>
      </div>

      {/* Active Filter Chips */}
      <FilterTagSpacer activeFilters={table.getState().columnFilters} table={table} />

      {/* Grouping Row */}
      {(viewMode === "list" && (extraTools?.grouping || extraTools?.grouping === undefined)) &&
        (<><div
          className="w-full flex items-center gap-2 p-2 border border-dashed border-border rounded-lg bg-muted/20 min-h-[48px] transition-all hover:bg-muted/40 group shadow-sm"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex items-center gap-2 text-muted-foreground text-xs px-2 select-none border-r pr-4 mr-2 border-border/50">
            <GripVertical className="w-4 h-4 opacity-40" />
            <span className="font-semibold uppercase tracking-wider opacity-70">Grouping</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {grouping.length === 0 ? (
              <div className="flex items-center gap-2 text-muted-foreground/60 text-sm italic py-1">
                <span>Drag column headers here to group your data...</span>
              </div>
            ) : (
              grouping.map((gid) => {
                const headerDef = table.getColumn(gid)?.columnDef.header;
                const label = typeof headerDef === "string" ? headerDef : gid;
                return (
                  <Badge
                    key={gid}
                    variant="secondary"
                    className="gap-2 pl-3 pr-1.5 h-8 text-xs font-semibold bg-background border shadow-sm animate-in fade-in zoom-in duration-200"
                  >
                    {label}
                    <button
                      onClick={() => table.getColumn(gid)?.toggleGrouping()}
                      className="hover:bg-muted rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </Badge>
                );
              })
            )}
          </div>
        </div>
        </>)}

      {/* Table Content */}
      <div className="relative min-h-[300px] mt-2">
        <Reload
          isLoading={extraTools?.isLoading ?? false}
          onReload={extraTools?.onReload || (() => window.location.reload())}
        />

        <div className={`transition-all duration-300 ${extraTools?.isLoading ? "opacity-50 pointer-events-none" : ""}`}>
          {viewMode === "list" ? (
            <div className="rounded-md border bg-background shadow-sm overflow-hidden">
              <div
                className="overflow-auto"
                style={{ maxHeight: extraTools?.tableHeight ?? "500px" }}
              >
                <Table>
                  <TableHeader className="sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id} className="bg-muted border-b border-border">
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            className={`font-semibold text-muted-foreground group relative ${(header.column.columnDef as any).headerClassName ?? ""}`}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="cursor-grab active:cursor-grabbing p-1 hover:bg-background/50 rounded transition-colors"
                                draggable
                                onDragStart={(e) => handleDragStart(e, header.id)}
                              >
                                <GripVertical className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <div
                                className="flex items-center gap-2 cursor-pointer select-none"
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{
                                  asc: <ChevronUp size={14} />,
                                  desc: <ChevronDown size={14} />,
                                }[header.column.getIsSorted() as string] ?? null}
                              </div>
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.length > 0 ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          className={`hover:bg-muted/50 transition-colors border-b border-border ${row.getIsGrouped() ? "bg-muted/40 hover:bg-muted/60 cursor-pointer border-l-4 border-l-primary/50" : ""} ${row.getIsSelected() ? "bg-accent/20" : ""}`}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {cell.getIsGrouped() ? (
                                <button
                                  onClick={row.getToggleExpandedHandler()}
                                  className="flex items-center gap-2 font-semibold"
                                >
                                  {row.getIsExpanded() ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  <Badge variant="outline" className="ml-2 text-[10px] py-0 h-4">{row.subRows.length} items</Badge>
                                </button>
                              ) : cell.getIsAggregated() ? (
                                flexRender(cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell, cell.getContext())
                              ) : cell.getIsPlaceholder() ? null : (
                                flexRender(cell.column.columnDef.cell, cell.getContext())
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={table.getVisibleLeafColumns().length}
                          className="h-24 text-center text-muted-foreground"
                        >
                          No records found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  {/* Conditionally Render Footer */}
                  {extraTools?.footerRows && extraTools.footerRows.length > 0 ? (
                    // Dynamic footer: one row per config entry, cells keyed by column id.
                    <TableFooter className="sticky bottom-0 z-10 bg-muted/30 border-t-2 border-border font-bold">
                      {extraTools.footerRows.map((footerRow, rowIndex) => (
                        <TableRow key={rowIndex} className={footerRow.className}>
                          {table.getVisibleLeafColumns().map((column) => {
                            const cellConfig = footerRow.cells?.[column.id];
                            const cellClassName =
                              cellConfig && typeof cellConfig === "object"
                                ? cellConfig.className
                                : undefined;
                            return (
                              <TableCell
                                key={column.id}
                                className={`text-left ${cellClassName ?? ""}`}
                              >
                                {renderFooterCell(
                                  cellConfig,
                                  table.getFilteredRowModel().rows,
                                  column.id
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableFooter>
                  ) : (
                    extraTools?.showFooter && (
                      <TableFooter className="bg-muted/30 border-t-2 border-border font-bold">
                        {table.getFooterGroups().map((footerGroup) => (
                          <TableRow key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                              <TableCell key={header.id} className="text-left">
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                    header.column.columnDef.footer,
                                    header.getContext()
                                  )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableFooter>
                    )
                  )}
                </Table>
              </div>
            </div>
          ) : extraTools?.gridComponent ? (
            <div
              className="overflow-auto"
              style={{ maxHeight: extraTools?.tableHeight ?? "500px" }}
            >
              {extraTools.gridComponent(
                table.getFilteredRowModel().rows.map((row) => row.original)
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-muted-foreground border border-border border-dashed rounded-md bg-muted/20">
              Grid view not implemented for this component yet.
            </div>
          )}
        </div>
      </div>

      {/* Footer Controls */}
      {viewMode === "list" && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border mt-4">
          <DataTablePageSize />
          <DataTablePagination
            totalPages={
              extraTools?.totalPages ??
              Math.ceil(data.length / (pagination.pageSize || 10))
            }
            currentPage={pageIndex + 1}
          />
        </div>
      )}
    </div>
  );
}
