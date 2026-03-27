

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../../shadcn/table";
import React from "react";
import { DataTableProps } from "../type";



export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick
}: DataTableProps<T>) {
  return (
    <div className="rounded-md border bg-background shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted border-b border-border">
            {columns.map((col, index) => (
              <TableHead key={index} className="font-semibold text-muted-foreground">
                {typeof col.header === "function" ? col.header() : col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((row) => (
              <TableRow
                key={keyExtractor(onRowClick ? row : row)}
                onClick={() => onRowClick && onRowClick(row)}
                className={`hover:bg-muted/50 transition-colors border-b border-border ${onRowClick ? "cursor-pointer" : ""
                  }`} >
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={colIndex === 0 ? "font-medium" : ""}
                  >
                    {col.cell
                      ? col.cell(row)
                      : col.accessorKey
                        ? String(row[col.accessorKey] || "N/A")
                        : null}
                  </TableCell>
                ))}
              </TableRow>
            ))
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
