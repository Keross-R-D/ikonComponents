import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from "react";
import { DataTableFilterMenu } from "../datatable-filter-menu";
import { DataTableColumnFilter } from "../datatable-column-filter";
import { SearchInput } from "../../search-input";
export function DataTableToolbar({ table, extraParams, }) {
    var _a, _b, _c, _d;
    return (_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsxs("div", { className: "flex-grow flex items-center justify-between gap-3 overflow-hidden", children: [((extraParams === null || extraParams === void 0 ? void 0 : extraParams.defaultTools) == undefined ||
                        (extraParams === null || extraParams === void 0 ? void 0 : extraParams.defaultTools) == true ||
                        (Array.isArray(extraParams === null || extraParams === void 0 ? void 0 : extraParams.defaultTools) &&
                            ((_a = extraParams === null || extraParams === void 0 ? void 0 : extraParams.defaultTools) === null || _a === void 0 ? void 0 : _a.includes("search")))) && (_jsx(SearchInput, { placeholder: "Search ...", onChange: (event) => table.setGlobalFilter(event.target.value), className: "max-w-sm" })), ((extraParams === null || extraParams === void 0 ? void 0 : extraParams.defaultTools) == undefined ||
                        (extraParams === null || extraParams === void 0 ? void 0 : extraParams.defaultTools) == true ||
                        (Array.isArray(extraParams === null || extraParams === void 0 ? void 0 : extraParams.defaultTools) &&
                            ((_b = extraParams === null || extraParams === void 0 ? void 0 : extraParams.defaultTools) === null || _b === void 0 ? void 0 : _b.includes("filter")))) && (_jsx(DataTableFilterMenu, { table: table }))] }), _jsxs("div", { className: "flex gap-3", children: [(_c = extraParams === null || extraParams === void 0 ? void 0 : extraParams.extraTools) === null || _c === void 0 ? void 0 : _c.map((tool, index) => (_jsx(Fragment, { children: tool }, index))), ((extraParams === null || extraParams === void 0 ? void 0 : extraParams.defaultTools) == undefined ||
                        (extraParams === null || extraParams === void 0 ? void 0 : extraParams.defaultTools) == true ||
                        (Array.isArray(extraParams === null || extraParams === void 0 ? void 0 : extraParams.defaultTools) &&
                            ((_d = extraParams === null || extraParams === void 0 ? void 0 : extraParams.defaultTools) === null || _d === void 0 ? void 0 : _d.includes("columnFilter")))) && (_jsx(DataTableColumnFilter, { table: table }))] })] }));
}
