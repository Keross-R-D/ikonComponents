import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../../shadcn/table";
import React, { useState } from "react";
import { DataTableProps, ColumnDef } from "../type";
import { ChevronRight, ChevronDown, GripVertical } from "lucide-react";
import { Badge } from "../../../shadcn/badge";

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  groupedColumns = [],
  onToggleGroup
}: DataTableProps<T>) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupId: string) => {
    const next = new Set(expandedGroups);
    if (next.has(groupId)) {
      next.delete(groupId);
    } else {
      next.add(groupId);
    }
    setExpandedGroups(next);
  };

  // Helper to get accessor key from column header string
  const getAccessor = (headerStr: string) => {
    const col = columns.find(c => (typeof c.header === 'string' ? c.header : '') === headerStr);
    return col?.accessorKey;
  };

  // Group data recursively
  const getGroupedData = (items: T[], groupIndices: string[]): any[] => {
    if (groupIndices.length === 0) return items;

    const [currentGroupHeader, ...remainingGroups] = groupIndices;
    const accessor = getAccessor(currentGroupHeader);

    if (!accessor) return items;

    const groups = new Map<any, T[]>();
    items.forEach(item => {
      const val = (item as any)[accessor] ?? "None";
      if (!groups.has(val)) groups.set(val, []);
      groups.get(val)!.push(item);
    });

    return Array.from(groups.entries()).map(([value, groupItems]) => ({
      isGroup: true,
      header: currentGroupHeader,
      value,
      id: `${currentGroupHeader}:${value}`,
      children: getGroupedData(groupItems, remainingGroups),
      count: groupItems.length
    }));
  };

  const groupedData = getGroupedData(data, groupedColumns);

  const renderRows = (items: any[], level = 0) => {
    return items.map((item, index) => {
      if (item.isGroup) {
        const isExpanded = expandedGroups.has(item.id);
        return (
          <React.Fragment key={item.id}>
            <TableRow
              className="bg-muted/40 hover:bg-muted/60 cursor-pointer border-l-4 border-l-primary/50"
              onClick={() => toggleGroup(item.id)}
            >
              <TableCell colSpan={columns.length} className="py-2" style={{ paddingLeft: `${level * 24 + 12}px` }}>
                <div className="flex items-center gap-2">
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.header}:</span>
                  <span className="font-semibold">{String(item.value)}</span>
                  <Badge variant="outline" className="ml-2 text-[10px] py-0 h-4">{item.count} items</Badge>
                </div>
              </TableCell>
            </TableRow>
            {isExpanded && renderRows(item.children, level + 1)}
          </React.Fragment>
        );
      }

      return (
        <TableRow
          key={keyExtractor(item)}
          onClick={() => onRowClick && onRowClick(item)}
          className={`hover:bg-muted/50 transition-colors border-b border-border ${onRowClick ? "cursor-pointer" : ""}`}
        >
          {columns.map((col, colIndex) => (
            <TableCell
              key={colIndex}
              className={colIndex === 0 ? "font-medium" : ""}
              style={{ paddingLeft: colIndex === 0 ? `${level * 24 + 16}px` : undefined }}
            >
              {col.cell
                ? col.cell(item)
                : col.accessorKey
                  ? String((item as any)[col.accessorKey] || "N/A")
                  : null}
            </TableCell>
          ))}
        </TableRow>
      );
    });
  };

  return (
    <div className="rounded-md border bg-background shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted border-b border-border">
            {columns.map((col, index) => {
              const headerText = typeof col.header === "string" ? col.header : "";
              return (
                <TableHead
                  key={index}
                  className="font-semibold text-muted-foreground group relative"
                >
                  <div className="flex items-center gap-2">
                    {headerText && (
                      <div
                        className="cursor-grab active:cursor-grabbing p-1 hover:bg-background/50 rounded transition-colors"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("columnHeader", headerText);
                        }}
                      >
                        <GripVertical className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                    {typeof col.header === "function" ? col.header() : col.header}
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            renderRows(groupedData)
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                No records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

