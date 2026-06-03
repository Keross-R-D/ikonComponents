

// export interface DataTableLayoutProps<T> {
//   data: T[];
//   columns: ColumnDef<T>[];
//   keyExtractor: (row: T) => string | number;
//   totalPages: number;
//   currentPage: number;

//   filterComponent?: React.ReactNode;
//   actionNode?: React.ReactNode;
//   onRowClick?: (row: T) => void;
//   gridComponent?: (data: T[]) => React.ReactNode;
//   isLoading?: boolean;
//   onReload?: () => void;
//   themeColor?: string;
//   onLoadMore?: () => void;
//   hasMore?: boolean;
//   onFilterChange?: (filters: Record<string, string[]>) => void;
// }


export interface ColumnDef<T> {
  header: string | (() => React.ReactNode);
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  groupedColumns?: string[];
  onToggleGroup?: (columnHeader: string) => void;
}

export interface DataTableLayoutProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  extraTools?: ExtraPrams<T>;

};

export type ExtraPrams<T> = {
  keyExtractor: (row: T) => string | number;
  totalPages: number;
  currentPage: number;

  filterComponent?: React.ReactNode;
  actionNode?: React.ReactNode;
  onRowClick?: (row: T) => void;
  gridComponent?: (data: T[]) => React.ReactNode;
  isLoading?: boolean;
  onReload?: () => void;
  themeColor?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  onFilterChange?: (filters: Record<string, string[]>) => void;
};