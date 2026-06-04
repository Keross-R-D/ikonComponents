"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DataTableLayout } from "../../src/ikoncomponents/table";
import { ColumnDef } from "../../src/ikoncomponents/table/type";
import { Button } from "../../src/shadcn/button";
import { Badge } from "../../src/shadcn/badge";
import { Plus, Mail, Trash, Shield, UserCheck } from "lucide-react";

// ─── Data Types ──────────────────────────────────────────────────────────────

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "User";
  status: "Active" | "Inactive";
  department: string;
  lastLogin: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_DATA: User[] = [
  { id: "1", name: "Anushri Dutta", email: "anushri@example.com", role: "Admin", status: "Active", department: "Engineering", lastLogin: "2024-05-08" },
  { id: "2", name: "John Doe", email: "john@example.com", role: "User", status: "Inactive", department: "Marketing", lastLogin: "2024-05-01" },
  { id: "3", name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active", department: "Design", lastLogin: "2024-05-07" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active", department: "Sales", lastLogin: "2024-05-05" },
  { id: "5", name: "Bob Wilson", email: "bob@example.com", role: "User", status: "Inactive", department: "Support", lastLogin: "2024-04-28" },
  { id: "6", name: "Charlie Davis", email: "charlie@example.com", role: "Editor", status: "Active", department: "Engineering", lastLogin: "2024-05-06" },
  { id: "7", name: "Diana Prince", email: "diana@example.com", role: "Admin", status: "Active", department: "HR", lastLogin: "2024-05-08" },
  { id: "8", name: "Ethan Hunt", email: "ethan@example.com", role: "User", status: "Active", department: "Operations", lastLogin: "2024-05-02" },
  { id: "9", name: "Fiona Gallagher", email: "fiona@example.com", role: "User", status: "Inactive", department: "Marketing", lastLogin: "2024-04-20" },
  { id: "10", name: "George Miller", email: "george@example.com", role: "Editor", status: "Active", department: "Design", lastLogin: "2024-05-03" },
  { id: "11", name: "Hannah Abbott", email: "hannah@example.com", role: "User", status: "Active", department: "Sales", lastLogin: "2024-05-04" },
  { id: "12", name: "Ian Wright", email: "ian@example.com", role: "User", status: "Active", department: "Engineering", lastLogin: "2024-05-01" },
  { id: "13", name: "Julia Roberts", email: "julia@example.com", role: "Editor", status: "Active", department: "HR", lastLogin: "2024-05-09" },
  { id: "14", name: "Kevin Hart", email: "kevin@example.com", role: "User", status: "Inactive", department: "Support", lastLogin: "2024-04-15" },
  { id: "15", name: "Laura Palmer", email: "laura@example.com", role: "Admin", status: "Active", department: "Operations", lastLogin: "2024-05-10" },
  { id: "16", name: "Mike Jordan", email: "mike@example.com", role: "User", status: "Active", department: "Sales", lastLogin: "2024-05-07" },
  { id: "17", name: "Nancy Drew", email: "nancy@example.com", role: "Editor", status: "Inactive", department: "Marketing", lastLogin: "2024-04-30" },
  { id: "18", name: "Oscar Martinez", email: "oscar@example.com", role: "User", status: "Active", department: "Design", lastLogin: "2024-05-06" },
  { id: "19", name: "Pamela Anderson", email: "pamela@example.com", role: "User", status: "Inactive", department: "Engineering", lastLogin: "2024-04-22" },
  { id: "20", name: "Quinn Parker", email: "quinn@example.com", role: "Admin", status: "Active", department: "HR", lastLogin: "2024-05-11" },
  { id: "21", name: "Rachel Green", email: "rachel@example.com", role: "Editor", status: "Active", department: "Support", lastLogin: "2024-05-08" },
  { id: "22", name: "Steve Rogers", email: "steve@example.com", role: "Admin", status: "Active", department: "Operations", lastLogin: "2024-05-09" },
  { id: "23", name: "Tina Turner", email: "tina@example.com", role: "User", status: "Inactive", department: "Sales", lastLogin: "2024-04-25" },
  { id: "24", name: "Uma Thurman", email: "uma@example.com", role: "Editor", status: "Active", department: "Marketing", lastLogin: "2024-05-05" },
  { id: "25", name: "Victor Nwosu", email: "victor@example.com", role: "User", status: "Active", department: "Engineering", lastLogin: "2024-05-04" },
  { id: "26", name: "Wendy Williams", email: "wendy@example.com", role: "Editor", status: "Active", department: "Design", lastLogin: "2024-05-03" },
  { id: "27", name: "Xander Cage", email: "xander@example.com", role: "User", status: "Inactive", department: "Support", lastLogin: "2024-04-18" },
  { id: "28", name: "Yara Fleur", email: "yara@example.com", role: "Admin", status: "Active", department: "HR", lastLogin: "2024-05-12" },
  { id: "29", name: "Zoe Saldana", email: "zoe@example.com", role: "Editor", status: "Inactive", department: "Operations", lastLogin: "2024-04-27" },
  { id: "30", name: "Liam Neeson", email: "liam@example.com", role: "User", status: "Active", department: "Sales", lastLogin: "2024-05-02" },
];

// ─── Column Definitions (using ColumnDef from table/type) ─────────────────────

const columns: ColumnDef<User>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: (row: User) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
          {row.name.charAt(0)}
        </div>
        <span className="font-medium">{row.name}</span>
      </div>
    ),
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Department",
    accessorKey: "department",
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: (row: User) => (
      <div className="flex items-center gap-1.5">
        {row.role === "Admin" && <Shield className="w-3.5 h-3.5 text-blue-500" />}
        {row.role === "Editor" && <UserCheck className="w-3.5 h-3.5 text-green-500" />}
        <span>{row.role}</span>
      </div>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row: User) => (
      <Badge
        variant={row.status === "Active" ? "default" : "secondary"}
        className={row.status === "Active" ? "bg-green-500 hover:bg-green-600 text-white" : ""}
      >
        {row.status}
      </Badge>
    ),
  },
  {
    header: "Last Login",
    accessorKey: "lastLogin",
  },
];

// ─── Main Demo Component ──────────────────────────────────────────────────────

function TableDemo() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const search = searchParams.get("search") || "";

  const [gridLimit, setGridLimit] = useState(12);
  const [activeFilters, setActiveFilters] = useState<Record<string, any[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [page, search, activeFilters]);

  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleLoadMore = () => {
    setTimeout(() => {
      setGridLimit((prev) => prev + 12);
    }, 500);
  };

  // Simulate server-side search + column filter + pagination
  const filteredData = MOCK_DATA.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.department.toLowerCase().includes(search.toLowerCase());

    const matchesFilters = Object.entries(activeFilters).every(([field, values]) => {
      if (!values || values.length === 0) return true;
      const col = columns.find((c) => c.header === field);
      const accessor = col?.accessorKey;
      if (!accessor) return true;
      const userValue = String((user as any)[accessor] || "");
      return values.includes(userValue);
    });

    return matchesSearch && matchesFilters;
  });

  const totalPages = Math.max(Math.ceil(filteredData.length / size), 1);
  const paginatedData = filteredData.slice((page - 1) * size, page * size);

  // Action node (toolbar buttons)
  const tableActions = (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" className="gap-1.5 h-9" onClick={() => alert("Sending invite...")}>
        <Mail className="w-4 h-4" /> Invite
      </Button>
      <Button variant="ghost" size="sm" className="gap-1.5 h-9 text-destructive hover:text-destructive" onClick={() => alert("Delete selected")}>
        <Trash className="w-4 h-4" /> Delete
      </Button>
      <Button size="sm" className="gap-1.5 h-9" onClick={() => alert("Add member")}>
        <Plus className="w-4 h-4" /> Add Member
      </Button>
    </div>
  );

  // Grid card renderer
  const gridComponent = (data: User[]) => {
    const gridData = data.slice(0, gridLimit);
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
        {gridData.map((user) => (
          <div
            key={user.id}
            className="group relative p-5 border rounded-xl bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold truncate group-hover:text-primary transition-colors">{user.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-dashed gap-2">
              <Badge variant="outline" className="text-xs capitalize">{user.role}</Badge>
              <span className="text-xs text-muted-foreground">{user.department}</span>
              <Badge
                variant={user.status === "Active" ? "default" : "secondary"}
                className={`text-xs ${user.status === "Active" ? "bg-green-500 text-white" : ""}`}
              >
                {user.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage your team members, roles, and access levels.
              <span className="ml-2 text-sm font-medium">{filteredData.length} members total</span>
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border shadow-sm p-6">
          <DataTableLayout
            data={paginatedData}
            columns={columns}
            extraTools={{
              keyExtractor: (row) => row.id,
              totalPages,
              currentPage: page,
              isLoading,
              onReload: handleReload,
              actionNode: tableActions,
              onLoadMore: handleLoadMore,
              hasMore: gridLimit < filteredData.length,
              onFilterChange: (filters) => {
                setActiveFilters(filters);
              },
              unfilteredData: MOCK_DATA,
              onRowClick: (row) => console.log("Row clicked:", row),
              gridComponent,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Page Export (wrapped in Suspense for useSearchParams) ────────────────────

export default function DataTableDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
        </div>
      }
    >
      <TableDemo />
    </Suspense>
  );
}
