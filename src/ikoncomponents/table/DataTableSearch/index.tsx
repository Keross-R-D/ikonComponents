"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Search } from "lucide-react";

export function DataTableSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // 1. Initialize local state from the URL 'search' param
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  // 2. Debounce the local state (500ms delay)
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  // 3. Update the URL whenever the debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
      // Update the global filter in the parent component
    } else {
      params.delete("search");
    }

    // Only navigate if the param actually changed (prevents redundant history entries)
    if (params.get("search") !== searchParams.get("search")) {
      params.set("page", "1"); // Reset to page 1 on new search
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [debouncedSearch, pathname, router, searchParams]);

  // 4. Sync local state if the URL is changed externally (e.g., browser back button)
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== searchTerm) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  return (
    <div className="relative  max-w-sm  min-w-[10%]">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex h-9 w-full rounded-md border border-border bg-transparent pl-9 pr-3 py-1 text-sm shadow-sm transition-colors text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
      />
    </div>
  );
}
