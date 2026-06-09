"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DataTableLayout } from "../src/ikoncomponents/table";
import { ActionMenu } from "../src/ikoncomponents/action-menu";
import { ColumnDef } from "../src/ikoncomponents/table/type";
import { Button } from "../src/shadcn/button";
import { Badge } from "../src/shadcn/badge";
import { Trash, Plus, Mail, UserCheck, Shield, Download } from "lucide-react";
import { CustomTabs } from "../src/ikoncomponents/tabs";
import { ThemeToggleBtn } from "../src/ikoncomponents/theme-toggle-btn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../src/shadcn/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../src/shadcn/tabs";
  import { ListIcon, LayoutDashboardIcon, UsersIcon } from "lucide-react";

// --- Mock Components ---

const IconTextButtonWithTooltip = ({
  children,
  tooltipContent,
  onClick,
  ...props
}: any) => (
  <Button
    onClick={onClick}
    {...props}
    title={tooltipContent}
    variant="outline"
    className="gap-2"
  >
    {children}
  </Button>
);

const LeadModal = ({ isOpen, onClose, onSuccess }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="p-6 rounded-lg shadow-xl border max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add New Lead</h2>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              alert("Lead Created!");
              onSuccess();
              onClose();
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- Mock Data ---

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "User";
  status: "Active" | "Inactive";
  department: "Sales" | "Engineering" | "HR";
}

const MOCK_DATA: User[] = [
  {
    id: "1",
    name: "Anushri Dutta",
    email: "anushri@example.com",
    role: "Admin",
    status: "Active",
    department: "Engineering",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    status: "Inactive",
    department: "Sales",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Active",
    department: "Engineering",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "User",
    status: "Active",
    department: "HR",
  },
  {
    id: "5",
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "User",
    status: "Inactive",
    department: "Sales",
  },
  {
    id: "6",
    name: "Charlie Davis",
    email: "charlie@example.com",
    role: "Editor",
    status: "Active",
    department: "Sales",
  },
];

function TableDemo() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [page, search, activeFilters]);

  const columns: ColumnDef<User>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Role", accessorKey: "role" },
    { header: "Department", accessorKey: "department" },
    {
      header: "Status",
      cell: (row: User) => (
        <Badge variant={row.status === "Active" ? "default" : "secondary"}>
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      cell: (row: User) => (
        <div className="flex justify-center">
          <ActionMenu
            actionMenus={[
              {
                label: "Edit",
                icon: UserCheck,
                onClick: () => alert(`Editing ${row.name}`),
              },
              {
                label: "Delete",
                icon: Trash,
                onClick: () => alert(`Deleting ${row.name}`),
              },
            ]}
          />
        </div>
      ),
    },
  ];

  const headerActions = (
    <div className="flex items-center gap-2">
      <IconTextButtonWithTooltip
        tooltipContent="Add new lead"
        onClick={() => setModalOpen(true)}
      >
        <Plus className="w-4 h-4" />
        Add Lead
      </IconTextButtonWithTooltip>

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => console.log("Refresh data")}
      />
    </div>
  );

  const filteredData = MOCK_DATA.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.department.toLowerCase().includes(search.toLowerCase());

    const matchesFilters = Object.entries(activeFilters).every(
      ([field, values]) => {
        if (!values || values.length === 0) return true;
        const col = columns.find((c) => c.header === field);
        const accessor = col?.accessorKey;
        if (!accessor) return true;
        const userValue = String((user as any)[accessor] || "");
        return values.includes(userValue);
      },
    );

    return matchesSearch && matchesFilters;
  });

const tabs = [
  {
    tabId: "task-list",
    tabName: "Task List",
    icon: <ListIcon className="size-4" />,
    tabContent: <div>...</div>,
    default: true,
  },
  {
    tabId: "board",
    tabName: "Board",
    icon: <LayoutDashboardIcon className="size-4" />,
    tabContent: <div>...</div>,
  },
  {
    tabId: "resource",
    tabName: "Resource Utilisation",
    icon: <UsersIcon className="size-4" />,
    tabContent: <div>...</div>,
  },
];


  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">
            DataTable Features Showcase
          </h1>
          <p className="text-muted-foreground text-lg">
            A powerful, flexible table with grouping, filtering, and export
            capabilities.
          </p>

          <ThemeToggleBtn />
        </div>

        <CustomTabs
          tabArray={[
            {
              tabId: "1",
              tabName: "Lead",
              tabContent: <Button>Lead</Button>,
              default: true,
            },
            {
              tabId: "2",
              tabName: "Deal",
              tabContent: <Button>Deal</Button>,
              default: false,
            },
          ]}
        />

        <Tabs defaultValue="overview" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  View your key metrics and recent project activity. Track
                  progress across all your active projects.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                You have 12 active projects and 3 pending tasks.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Track performance and user engagement metrics. Monitor trends
                  and identify growth opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Page views are up 25% compared to last month.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>
                  Generate and download your detailed reports. Export data in
                  multiple formats for analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                You have 5 reports ready and available to export.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and options. Customize your
                  experience to fit your needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Configure notifications, security, and themes.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="bg-card rounded-xl border p-6 shadow-lg">
          <DataTableLayout
            data={filteredData}
            columns={columns}
            extraTools={{
              keyExtractor: (row) => row.id,
              totalPages: 1,
              currentPage: page,
              themeColor: "#6366f1", // Custom indigo color
              actionNode: headerActions,
              onRowClick: (row: User) => console.log("Row Clicked:", row),
              isLoading,
              onFilterChange: (filters) => setActiveFilters(filters),
              unfilteredData: MOCK_DATA,
              gridComponent: (data: User[]) => (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.map((user) => (
                    <div
                      key={user.id}
                      className="p-4 border rounded-lg bg-card shadow-sm hover:border-primary transition-colors"
                    >
                      <h3 className="font-bold text-lg">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <div className="mt-4 flex justify-between items-center border-t pt-2">
                        <Badge variant="outline">{user.role}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {user.department}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ),
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-primary/5 rounded-xl border border-primary/10">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-primary">
              <Shield className="w-4 h-4" /> Grouping
            </h4>
            <p className="text-sm text-muted-foreground">
              Drag the handle (⋮⋮) on column headers to the grouping zone above
              the table.
            </p>
          </div>
          <div className="p-5 bg-green-500/5 rounded-xl border border-green-500/10">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-green-600">
              <Mail className="w-4 h-4" /> Filtering
            </h4>
            <p className="text-sm text-muted-foreground">
              Use the <b>Table Filter</b> to search specific columns or the
              global search for everything.
            </p>
          </div>
          <div className="p-5 bg-blue-500/5 rounded-xl border border-blue-500/10">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-blue-600">
              <Download className="w-4 h-4" /> Export
            </h4>
            <p className="text-sm text-muted-foreground">
              Click <b>Export</b> to download your currently filtered data as a
              CSV file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <TableDemo />
    </Suspense>
  );
}
