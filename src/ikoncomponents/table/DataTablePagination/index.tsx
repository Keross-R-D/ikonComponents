"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

 interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function DataTablePagination({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="h-9 px-3 py-1 text-sm font-medium border border-border rounded-md bg-background text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      <span className="text-sm text-muted-foreground px-2">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{Math.max(totalPages, 1)}</span>
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="h-9 px-3 py-1 text-sm font-medium border border-border rounded-md bg-background text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
}