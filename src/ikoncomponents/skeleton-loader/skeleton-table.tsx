"use client";

import { Skeleton } from "../../shadcn/skeleton";

export interface GradeTableLoaderProps {
  rowCount?: number;
  showToolbar?: boolean;
}

export function GradeTableLoader({
  rowCount = 6,
  showToolbar = true,
}: GradeTableLoaderProps) {
  return (
    <div className="space-y-4">
      {/* Top action bar */}
      {showToolbar && (
        <div className="flex justify-between">
          <Skeleton className="h-8 w-64 rounded-md" />
          <Skeleton className="h-8 w-32 rounded-md" />
        </div>
      )}

      {/* Table body rows */}
      <div className="space-y-4">
        {[...Array(rowCount)].map((_, i) => (
          <div key={i} className="grid gap-4 items-center">
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
