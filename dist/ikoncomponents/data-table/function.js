export const getDataTableColumnTitle = (column) => {
    var _a, _b, _c;
    return ((_a = column === null || column === void 0 ? void 0 : column.columnDef) === null || _a === void 0 ? void 0 : _a.title) ||
        (((_b = column === null || column === void 0 ? void 0 : column.columnDef) === null || _b === void 0 ? void 0 : _b.header) && typeof column.columnDef.header == 'string' && ((_c = column === null || column === void 0 ? void 0 : column.columnDef) === null || _c === void 0 ? void 0 : _c.header)) ||
        column.id;
};
