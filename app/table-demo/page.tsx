"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DataTableLayout } from "../../src/ikoncomponents/table";
import { ColumnDef } from "../../src/ikoncomponents/table/type";
import { Button } from "../../src/shadcn/button";
import { Badge } from "../../src/shadcn/badge";
import { Send, Trash, Plus, Mail, UserCheck, Shield } from "lucide-react";

// Mock Data Type
interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "User";
  status: "Active" | "Inactive";
  lastLogin: string;
}

// Mock Data
const MOCK_DATA: User[] = [
  { id: "1", name: "Anushri Dutta", email: "anushri@example.com", role: "Admin", status: "Active", lastLogin: "2024-05-08" },
  { id: "2", name: "John Doe", email: "john@example.com", role: "User", status: "Inactive", lastLogin: "2024-05-01" },
  { id: "3", name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active", lastLogin: "2024-05-07" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active", lastLogin: "2024-05-05" },
  { id: "5", name: "Bob Wilson", email: "bob@example.com", role: "User", status: "Inactive", lastLogin: "2024-04-28" },
  { id: "6", name: "Charlie Davis", email: "charlie@example.com", role: "Editor", status: "Active", lastLogin: "2024-05-06" },
  { id: "7", name: "Diana Prince", email: "diana@example.com", role: "Admin", status: "Active", lastLogin: "2024-05-08" },
  { id: "8", name: "Ethan Hunt", email: "ethan@example.com", role: "User", status: "Active", lastLogin: "2024-05-02" },
  { id: "9", name: "Fiona Gallagher", email: "fiona@example.com", role: "User", status: "Inactive", lastLogin: "2024-04-20" },
  { id: "10", name: "George Miller", email: "george@example.com", role: "Editor", status: "Active", lastLogin: "2024-05-03" },
  { id: "11", name: "Hannah Abbott", email: "hannah@example.com", role: "User", status: "Active", lastLogin: "2024-05-04" },
  { id: "12", name: "Ian Wright", email: "ian@example.com", role: "User", status: "Active", lastLogin: "2024-05-01" },
  { id: "13", name: "Julia Roberts", email: "julia@example.com", role: "Editor", status: "Active", lastLogin: "2024-05-09" },
  { id: "14", name: "Kevin Hart", email: "kevin@example.com", role: "User", status: "Inactive", lastLogin: "2024-04-15" },
  { id: "15", name: "Laura Palmer", email: "laura@example.com", role: "Admin", status: "Active", lastLogin: "2024-05-10" },
  { id: "16", name: "Mike Jordan", email: "mike@example.com", role: "User", status: "Active", lastLogin: "2024-05-07" },
  { id: "17", name: "Nancy Drew", email: "nancy@example.com", role: "Editor", status: "Inactive", lastLogin: "2024-04-30" },
  { id: "18", name: "Oscar Martinez", email: "oscar@example.com", role: "User", status: "Active", lastLogin: "2024-05-06" },
  { id: "19", name: "Pamela Anderson", email: "pamela@example.com", role: "User", status: "Inactive", lastLogin: "2024-04-22" },
  { id: "20", name: "Quinn Parker", email: "quinn@example.com", role: "Admin", status: "Active", lastLogin: "2024-05-11" },
  { id: "21", name: "Rachel Green", email: "rachel@example.com", role: "Editor", status: "Active", lastLogin: "2024-05-08" },
  { id: "22", name: "Steve Rogers", email: "steve@example.com", role: "Admin", status: "Active", lastLogin: "2024-05-09" },
  { id: "23", name: "Tina Turner", email: "tina@example.com", role: "User", status: "Inactive", lastLogin: "2024-04-25" },
  { id: "24", name: "Uma Thurman", email: "uma@example.com", role: "Editor", status: "Active", lastLogin: "2024-05-05" },
  { id: "25", name: "Victor Nwosu", email: "victor@example.com", role: "User", status: "Active", lastLogin: "2024-05-04" },
  { id: "26", name: "Wendy Williams", email: "wendy@example.com", role: "Editor", status: "Active", lastLogin: "2024-05-03" },
  { id: "27", name: "Xander Cage", email: "xander@example.com", role: "User", status: "Inactive", lastLogin: "2024-04-18" },
  { id: "28", name: "Yara Fleur", email: "yara@example.com", role: "Admin", status: "Active", lastLogin: "2024-05-12" },
  { id: "29", name: "Zoe Saldana", email: "zoe@example.com", role: "Editor", status: "Inactive", lastLogin: "2024-04-27" },
  { id: "30", name: "Liam Neeson", email: "liam@example.com", role: "User", status: "Active", lastLogin: "2024-05-02" },
];

function TableDemo() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const search = searchParams.get("search") || "";

  const [gridLimit, setGridLimit] = useState(12);
  // Simulates server-side column filters state (in real app: send these to API)
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const handleLoadMore = () => {
    setTimeout(() => {
      setGridLimit((prev: number) => prev + 12);
    }, 500);
  };

  // Simulate server-side: apply search + column filters, then paginate
  const filteredData = MOCK_DATA.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesFilters = Object.entries(activeFilters).every(([field, values]) => {
      if (!values || values.length === 0) return true;
      return values.includes((user as any)[field] ?? "");
    });

    return matchesSearch && matchesFilters;
  });

  const totalPages = Math.max(Math.ceil(filteredData.length / size), 1);
  const paginatedData = filteredData.slice((page - 1) * size, page * size);

  // Column Definitions
  const columns: ColumnDef<User>[] = [
    {
      header: "Name",
      cell: (row: User) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
            {row.name.charAt(0)}
          </div>
          <span className="font-medium">{row.name}</span>
        </div>
      )
    },
    { header: "Email", accessorKey: "email" },
    {
      header: "Role",
      cell: (row: User) => (
        <div className="flex items-center gap-1.5">
          {row.role === "Admin" && <Shield className="w-3.5 h-3.5 text-blue-500" />}
          {row.role === "Editor" && <UserCheck className="w-3.5 h-3.5 text-green-500" />}
          <span>{row.role}</span>
        </div>
      )
    },
    {
      header: "Status",
      cell: (row: User) => (
        <Badge variant={row.status === "Active" ? "default" : "secondary"} className={row.status === "Active" ? "bg-green-500 hover:bg-green-600" : ""}>
          {row.status}
        </Badge>
      )
    },
    { header: "Last Login", accessorKey: "lastLogin" },
  ];

  // Action buttons to be placed in the three-dots menu (actionNode)
  const tableActions = (
    <div className="flex flex-col gap-1">
      <Button variant="ghost" onClick={() => alert("Sending invite...")}>
        <Mail className="w-4 h-4 text-muted-foreground" /> Send Invitation
      </Button>
      <Button variant="ghost" onClick={() => alert("Promoting user...")}>
        <Shield className="w-4 h-4 text-muted-foreground" /> Promote to Admin
      </Button>
      <Button variant="ghost" onClick={() => alert("Deleting user...")}>
        <Trash className="w-4 h-4 text-muted-foreground" /> Delete User
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b pb-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight">User Management</h1>
            <p className="text-muted-foreground text-lg">Manage your team members and their access levels.</p>
          </div>
          <Button className="gap-2 shadow-lg hover:shadow-xl transition-all">
            <Plus className="w-4 h-4" /> Add Member
          </Button>
        </div>

        {/* Main Table Section */}
        <div className="bg-card rounded-xl border shadow-sm p-6 overflow-hidden">
          <DataTableLayout
            data={paginatedData}
            columns={columns}
            keyExtractor={(row) => row.id}
            totalPages={totalPages}
            currentPage={page}
            actionNode={tableActions}
            onLoadMore={handleLoadMore}
            hasMore={gridLimit < filteredData.length}
            onFilterChange={(filters) => {
              // In a real app: call your API here with the new filters
              // e.g. fetchUsers({ page: 1, size, search, ...filters })
              setActiveFilters(filters);
            }}
            onRowClick={(row: User) => console.log("Row clicked:", row)}
            gridComponent={() => {
              const gridData = filteredData.slice(0, gridLimit);
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
                  {gridData.map((user: User) => (
                    <div key={user.id} className="group relative p-6 border rounded-xl bg-card hover:border-primary/50 hover:shadow-md transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-dashed">
                        <Badge variant="outline" className="capitalize">{user.role}</Badge>
                        <span className="text-xs text-muted-foreground italic">Login: {user.lastLogin}</span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function DataTableDemoPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <TableDemo />
    </Suspense>
  );
}
