"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function DataTableFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "";

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const newStatus = e.target.value;

    if (newStatus) {
      params.set("status", newStatus);
    } else {
      params.delete("status");
    }

    params.set("page", "1"); 
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select 
      className="flex h-10 items-center justify-between rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      value={currentStatus}
      onChange={handleStatusChange}
    >
      <option value="">All Statuses</option>
      <option value="NEW">New</option>
      <option value="CONTACTED">Contacted</option>
      <option value="QUALIFIED">Qualified</option>
      <option value="LOST">Lost</option>
    </select>
  );
}