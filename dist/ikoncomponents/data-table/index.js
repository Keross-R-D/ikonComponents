"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useImperativeHandle, useState, } from "react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, getGroupedRowModel, getExpandedRowModel, useReactTable, getFacetedUniqueValues, getFacetedMinMaxValues, getFacetedRowModel, } from "@tanstack/react-table";
import { ChevronDown, ChevronRight, ChevronUp, X, } from "lucide-react";
import { Button } from "../../shadcn/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "../../shadcn/table";
import { DataTableToolbar } from "./datatable-toolbar";
import { getDataTableColumnTitle } from "./function";
import { Checkbox } from "../../shadcn/checkbox";
import { DataTablePagination } from "./datatable-pagination";
import { ActionMenu } from "../action-menu";
import { cx } from "class-variance-authority";
export const DataTable = (({ columns, data, extraParams, onTableReady }, ref) => {
    const [sorting, setSorting] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [pagination, setPagination] = React.useState({
        pageIndex: (extraParams === null || extraParams === void 0 ? void 0 : extraParams.pageIndex) || 0,
        pageSize: (extraParams === null || extraParams === void 0 ? void 0 : extraParams.pageSize) || 15,
    });
    // useImperativeHandle(ref, () => ({
    //   toggleAllRowsExpanded: (expanded: boolean) => {
    //     table.toggleAllRowsExpanded(expanded);
    //   },
    //   getTableInstance: () => table, // Optional: Expose the entire table instance if needed
    // }));
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [grouping, setGrouping] = React.useState([]);
    const [expanded, setExpanded] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});
    columns = columns.map((column) => {
        if (!(column === null || column === void 0 ? void 0 : column.filterFn)) {
            column.filterFn = "arrIncludesSome";
        }
        return column;
    });
    useEffect(() => {
        if (extraParams === null || extraParams === void 0 ? void 0 : extraParams.checkBoxColumnCallback)
            extraParams.checkBoxColumnCallback(table.getFilteredSelectedRowModel().rows);
    }, [rowSelection]);
    if (extraParams === null || extraParams === void 0 ? void 0 : extraParams.checkBoxColumn) {
        columns.splice(0, 0, {
            id: "checkBoxColumn",
            header: ({ table }) => (_jsx(Checkbox, { checked: table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate"), onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value), "aria-label": "Select all" })),
            cell: ({ row }) => (_jsx(_Fragment, { children: _jsx(Checkbox, { checked: row.getIsSelected(), onCheckedChange: (value) => row.toggleSelected(!!value), "aria-label": "Select row" }) })),
            enableSorting: false,
            enableHiding: false,
        });
    }
    if ((extraParams === null || extraParams === void 0 ? void 0 : extraParams.actionMenu) || (extraParams === null || extraParams === void 0 ? void 0 : extraParams.groupActionMenu)) {
        columns.push({
            id: "DTActions",
            accessorKey: "Actions",
            header: () => _jsx("div", { className: "text-center", children: "Action" }),
            size: 20,
            headerClassName: "text-center",
            cell: ({ row }) => {
                if (row.getIsGrouped()) {
                    return (extraParams === null || extraParams === void 0 ? void 0 : extraParams.groupActionMenu) ? (_jsx("div", { className: "text-end", children: _jsx(ActionMenu, { actionMenus: extraParams.groupActionMenu.items, extraActionParams: {
                                arguments: [
                                    row.original,
                                    ...(extraParams.groupActionMenu.extraArguments || []),
                                ],
                            } }) })) : null;
                }
                else if (extraParams === null || extraParams === void 0 ? void 0 : extraParams.actionMenu) {
                    return (_jsx("div", { className: "text-center", children: _jsx(ActionMenu, { actionMenus: extraParams.actionMenu.items, extraActionParams: {
                                arguments: [
                                    row.original,
                                    ...(extraParams.actionMenu.extraArguments || []),
                                ],
                            } }) }));
                }
                else {
                    return null;
                }
            },
            enableSorting: false,
            enableHiding: false,
        });
    }
    // const onPaginationChange = (state: any) => {
    //   console.warn(state);
    //   setPagination(state);
    //   extraParams?.onPaginationChange?.(state);
    // }
    useEffect(() => {
        var _a;
        (_a = extraParams === null || extraParams === void 0 ? void 0 : extraParams.onPaginationChange) === null || _a === void 0 ? void 0 : _a.call(extraParams, pagination);
    }, [pagination]);
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter,
            columnFilters,
            columnVisibility,
            rowSelection,
            grouping,
            expanded,
            pagination,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onExpandedChange: setExpanded,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onGroupingChange: setGrouping,
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        manualPagination: ((extraParams === null || extraParams === void 0 ? void 0 : extraParams.pagination) == undefined || (extraParams === null || extraParams === void 0 ? void 0 : extraParams.pagination) == true) ? undefined : true
    });
    useImperativeHandle(ref, () => table);
    const [droppedHeaders, setDroppedHeaders] = useState([]);
    // Drag Event Handlers
    const handleDragStart = (e, header) => {
        const headerObj = {
            id: header.id,
            title: getDataTableColumnTitle(header.column),
        };
        e.dataTransfer.setData("headerObj", JSON.stringify(headerObj));
        e.dataTransfer.effectAllowed = "move";
    };
    const handleDrop = (e) => {
        e.preventDefault();
        const headerObj = JSON.parse(e.dataTransfer.getData("headerObj"));
        if (!droppedHeaders.find((e) => e.id == headerObj.id)) {
            setDroppedHeaders((prevHeaders) => [...prevHeaders, headerObj]);
            const column = table.getColumn(headerObj.id);
            if (column) {
                column.getToggleGroupingHandler()();
            }
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault(); // Necessary to allow dropping
    };
    const handleRemoveGrouping = (groupId) => {
        const newDroppedHeaders = droppedHeaders.filter((header) => header.id !== groupId);
        setDroppedHeaders(() => [...newDroppedHeaders]);
        const column = table.getColumn(groupId);
        if (column) {
            column.getToggleGroupingHandler()();
        }
    };
    const [isMount, setIsMount] = useState(false);
    useEffect(() => {
        if (!isMount) {
            setIsMount(true);
        }
        if (extraParams === null || extraParams === void 0 ? void 0 : extraParams.defaultGroups) {
            table.setGrouping(extraParams === null || extraParams === void 0 ? void 0 : extraParams.defaultGroups);
        }
    }, []);
    useEffect(() => {
        if (onTableReady) {
            onTableReady(table);
        }
    }, [onTableReady, table]);
    return (isMount && (_jsxs("div", { className: "w-full h-full flex flex-col gap-3 justify-between", children: [_jsxs("div", { className: "flex-grow flex flex-col gap-3 overflow-hidden", children: [((extraParams === null || extraParams === void 0 ? void 0 : extraParams.defaultTools) == undefined ||
                        extraParams.defaultTools ||
                        extraParams.extraTools) && (_jsx(DataTableToolbar, { table: table, extraParams: extraParams })), _jsxs("div", { className: "flex-grow flex flex-col overflow-hidden", children: [((extraParams === null || extraParams === void 0 ? void 0 : extraParams.grouping) == undefined || extraParams.grouping) && (_jsx("div", { className: "w-full border-t min-h-10 px-2 py-1 flex gap-3 items-center text-sm bg-card-new", onDrop: handleDrop, onDragOver: handleDragOver, children: droppedHeaders.length === 0
                                    ? "Drag a column header here to group its column"
                                    : droppedHeaders.map((header, index) => (_jsxs("div", { className: "rounded-md px-2 py-1 bg-muted text-muted-foreground flex gap-3 items-center", children: [header.title, _jsx("span", { onClick: () => handleRemoveGrouping(header.id), children: _jsx(X, { size: 15 }) })] }, header.id))) })), _jsx("div", { className: "flex-grow overflow-hidden", children: _jsxs(Table, { className: "border-t whitespace-nowrap bg-card-new", children: [((extraParams === null || extraParams === void 0 ? void 0 : extraParams.header) == undefined || extraParams.header) && (_jsx(TableHeader, { className: "sticky top-0 z-10 border-t bg-card-new", children: table.getHeaderGroups().map((headerGroup) => (_jsx(TableRow, { className: cx(""), children: headerGroup.headers.map((header) => {
                                                    if (header.column.getIsGrouped()) {
                                                        if (header.column.getGroupedIndex() <
                                                            droppedHeaders.length - 1) {
                                                            return null;
                                                        }
                                                        return (_jsx(TableHead, { colSpan: droppedHeaders.length, className: cx("w-36 ", "text-left") }, header.id));
                                                    }
                                                    else {
                                                        return (_jsx(TableHead, Object.assign({}, ((extraParams === null || extraParams === void 0 ? void 0 : extraParams.grouping) == undefined ||
                                                            extraParams.grouping
                                                            ? {
                                                                onDragStart: (e) => handleDragStart(e, header),
                                                                draggable: true,
                                                            }
                                                            : {}), { className: cx("text-left"), children: header.isPlaceholder ? null : ((extraParams === null || extraParams === void 0 ? void 0 : extraParams.sorting) ==
                                                                undefined ||
                                                                extraParams.sorting) &&
                                                                header.column.getCanSort() ? (_jsxs("div", { onClick: header.column.getToggleSortingHandler(), className: cx("-mx-2 inline-flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1 hover:bg-muted"), children: [_jsx("div", { children: flexRender(header.column.columnDef.header, header.getContext()) }), header.column.getCanSort() ? (_jsxs("div", { className: "-space-y-2", children: [_jsx(ChevronUp, { className: cx("size-3.5 text-foreground", header.column.getIsSorted() ===
                                                                                    "desc"
                                                                                    ? "opacity-30"
                                                                                    : ""), "aria-hidden": "true" }), _jsx(ChevronDown, { className: cx("size-3.5 text-foreground", header.column.getIsSorted() ===
                                                                                    "asc"
                                                                                    ? "opacity-30"
                                                                                    : ""), "aria-hidden": "true" })] })) : null] })) : (flexRender(header.column.columnDef.header, header.getContext())) }), header.id));
                                                    }
                                                }) }, headerGroup.id))) })), _jsx(TableBody, { children: table.getRowModel().rows.length ? (table.getRowModel().rows.map((row) => row.getIsGrouped() ? (_jsx(TableRow, { children: row.getVisibleCells().map((cell) => {
                                                    var _a;
                                                    if (cell.column.getIndex() < row.depth) {
                                                        return null;
                                                    }
                                                    return (
                                                    // colSpan={cell.column.getIndex() == row.depth ? row.depth + 1 : undefined}
                                                    _jsx(TableCell, { colSpan: cell.column.getIndex() == row.depth
                                                            ? row.depth + 1
                                                            : undefined, className: cell.column.getIndex() == row.depth
                                                            ? "w-36"
                                                            : "", children: cell.getIsGrouped() ? (_jsxs(Button, { variant: "link", onClick: row.getToggleExpandedHandler(), className: `text-right text-foreground`, style: {
                                                                marginLeft: row.depth + "rem",
                                                            }, children: [row.getIsExpanded() ? (_jsx(ChevronDown, {})) : (_jsx(ChevronRight, {})), " ", flexRender(cell.column.columnDef.cell, cell.getContext()), " ", "(", row.subRows.length, ")"] })) : cell.column.id == "DTActions" ? (flexRender(cell.column.columnDef.cell, cell.getContext())) : cell.getIsAggregated() ? (flexRender((_a = cell.column.columnDef.aggregatedCell) !== null && _a !== void 0 ? _a : cell.column.columnDef.cell, cell.getContext())) : cell.getIsPlaceholder() ? null : (flexRender(cell.column.columnDef.cell, cell.getContext())) }, cell.id));
                                                }) }, row.id)) : (_jsx(TableRow, Object.assign({ className: cx(row.getIsSelected() ? "bg-accent/10" : "") }, ((extraParams === null || extraParams === void 0 ? void 0 : extraParams.checkBoxColumn) && {
                                                onClick: () => row.toggleSelected(!row.getIsSelected()),
                                            }), { children: row.getVisibleCells().map((cell, index) => (_jsxs(TableCell, { className: cx(row.getIsSelected() ? "relative" : "", !((extraParams === null || extraParams === void 0 ? void 0 : extraParams.actionMenu) ||
                                                        (extraParams === null || extraParams === void 0 ? void 0 : extraParams.groupActionMenu)) && "py-2"), children: [index === 0 && row.getIsSelected() && (_jsx("div", { className: "absolute inset-y-0 left-0 w-0.5 bg-primary" })), cell.getIsPlaceholder()
                                                            ? null
                                                            : flexRender(cell.column.columnDef.cell, cell.getContext())] }, cell.id))) }), row.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center", children: "No results." }) })) }), (extraParams === null || extraParams === void 0 ? void 0 : extraParams.footer) && (_jsx(TableFooter, { className: "sticky bottom-0 bg-background text-foreground", children: table.getFooterGroups().map((group) => (_jsx(TableRow, { children: group.headers.map((header) => (_jsx(TableCell, { children: header.isPlaceholder ? null : (_jsx("div", { className: "flex items-center", children: flexRender(header.column.columnDef.footer, header.getContext()) })) }))) }))) }))] }) })] })] }), ((extraParams === null || extraParams === void 0 ? void 0 : extraParams.paginationBar) == undefined ||
                extraParams.paginationBar) && (_jsx(DataTablePagination, { table: table, extraParams: extraParams }))] })));
});
