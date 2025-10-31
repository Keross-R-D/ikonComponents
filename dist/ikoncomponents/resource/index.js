import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-hooks/preserve-manual-memoization */
import React, { useMemo } from 'react';
import { Button } from "../../shadcn/button";
import { Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shadcn/select";
import { Input } from "../../shadcn/input";
import { DataTable } from '../data-table';
export const ResourceTable = ({ resourceDataWithAllocation, userMaps, monthsRange, }) => {
    const [data, setData] = React.useState(resourceDataWithAllocation);
    const calculateTotalFTE = (row) => {
        if (!row.detailedAllocation)
            return 0;
        return Object.values(row.detailedAllocation).reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
    };
    const handleAddResource = (taskId) => {
        var _a;
        const newResource = {
            id: `new-${Date.now()}`,
            taskId,
            taskName: ((_a = data.find(r => r.taskId === taskId)) === null || _a === void 0 ? void 0 : _a.taskName) || '',
            userId: '',
            roleId: '',
            detailedAllocation: monthsRange.reduce((acc, month) => (Object.assign(Object.assign({}, acc), { [month]: 0 })), {}),
        };
        setData([...data, newResource]);
    };
    const handleDeleteResource = (resourceId) => {
        setData(data.filter(resource => resource.id !== resourceId));
    };
    const handleUpdateAllocation = (resourceId, month, value) => {
        setData(data.map(resource => {
            if (resource.id === resourceId) {
                return Object.assign(Object.assign({}, resource), { detailedAllocation: Object.assign(Object.assign({}, resource.detailedAllocation), { [month]: parseFloat(value) || 0 }) });
            }
            return resource;
        }));
    };
    const columns = useMemo(() => [
        {
            accessorKey: "taskName",
            header: "Task Name",
            cell: ({ row }) => row.original.taskName,
        },
        {
            accessorKey: "userId",
            header: "Employee Name",
            cell: ({ row }) => {
                var _a;
                return (_jsxs(Select, { value: row.original.userId, onValueChange: (value) => {
                        setData(data.map(resource => resource.id === row.original.id
                            ? Object.assign(Object.assign({}, resource), { userId: value }) : resource));
                    }, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select employee", children: ((_a = userMaps.userDetailsMap[row.original.userId]) === null || _a === void 0 ? void 0 : _a.name) || "Select employee" }) }), _jsx(SelectContent, { children: Object.entries(userMaps.userDetailsMap).map(([id, user]) => (_jsx(SelectItem, { value: id, children: user.name }, id))) })] }));
            },
        },
        {
            accessorKey: "roleId",
            header: "Role",
            cell: ({ row }) => {
                var _a;
                return (_jsxs(Select, { value: row.original.roleId, onValueChange: (value) => {
                        setData(data.map(resource => resource.id === row.original.id
                            ? Object.assign(Object.assign({}, resource), { roleId: value }) : resource));
                    }, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select role", children: ((_a = userMaps.rolesMap[row.original.roleId]) === null || _a === void 0 ? void 0 : _a.roleName) || "Select role" }) }), _jsx(SelectContent, { children: Object.entries(userMaps.rolesMap).map(([id, role]) => (_jsx(SelectItem, { value: id, children: role.roleName }, id))) })] }));
            },
        },
        {
            accessorKey: "totalFTE",
            header: "Total FTE",
            cell: ({ row }) => calculateTotalFTE(row.original).toFixed(2),
        },
        ...monthsRange.map(month => ({
            accessorKey: `detailedAllocation.${month}`,
            header: month.replace('_', ' '),
            cell: ({ row }) => (_jsx(Input, { type: "number", min: "0", max: "1", step: "0.1", value: row.original.detailedAllocation[month] || 0, onChange: (e) => handleUpdateAllocation(row.original.id, month, e.target.value), className: "w-20" })),
        })),
        {
            id: "actions",
            cell: ({ row }) => (_jsxs("div", { className: "flex gap-2 justify-end", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleAddResource(row.original.taskId), children: _jsx(Plus, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleDeleteResource(row.original.id), children: _jsx(Trash2, { className: "h-4 w-4" }) })] })),
        },
    ], [data, monthsRange, userMaps]);
    return (_jsx(DataTable, { columns: columns, data: data, extraParams: {
            defaultGroups: ["taskName"],
            grouping: true,
            sorting: true,
            header: true,
            paginationBar: true,
        } }));
};
