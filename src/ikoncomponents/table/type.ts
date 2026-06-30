import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import type { ActionMenuProps } from "../action-menu/type";

export interface DataTableLayoutProps<T> {
  data: T[];
  columns: ColumnsProps<T, unknown>[];
  extraTools?: ExtraPrams<T>;
}

export type ExtraPrams<T> = {
  /** Total page count. When omitted, it's derived from `data.length / pageSize` (10/page default). */
  totalPages?: number;
  /**
   * Server-side (pageable) pagination. When true, the table renders `data` as-is
   * (already paged by your API) and emits `onPaginationChange` so the parent can
   * fetch the next page. When false/undefined (default) the table receives the
   * full `data` and paginates client-side — i.e. "call all data" mode.
   */
  manualPagination?: boolean;
  /** Initial page index (0-based). Defaults to 0. */
  pageIndex?: number;
  /** Initial / current page size. Defaults to 10. */
  pageSize?: number;
  /** Fired whenever the page index or size changes — use it to fetch from your API. */
  onPaginationChange?: (state: PaginationState) => void;
  toggleViewMode?: boolean;
  hiddenColumns?: string[];
  actionNode?: React.ReactNode;
  actionMenu?: TableActionMenuProps;
  groupActionMenu?: TableActionMenuProps;
  gridComponent?: (data: T[]) => React.ReactNode;
  isLoading?: boolean;
  onReload?: () => void;
  /** Enable default grouping. When true, the table is grouped by `groupedValue` on first render. */
  grouping?: boolean;
  /** Column id(s) to group by initially (used when `grouping` is true). */
  groupedValue?: string[];
  showFooter?: boolean;
  footerLabel?: string;
  /** Max height of the scrollable content (shared by list & grid view), e.g. "500px" or "60vh". */
  tableHeight?: string;
  /**
   * Dynamic footer definition. Each entry is one footer row, so the footer can
   * show multiple labels / summary rows. When provided (non-empty) it takes
   * precedence over the column-level `footer` definitions used by `showFooter`.
   */
  footerRows?: FooterRowConfig<T>[];
  fileName?: string;
};

/** Built-in single-column aggregations available to a footer cell. */
export type FooterAggregate = "sum" | "avg" | "min" | "max" | "count";

/** Arithmetic operations for combining several columns in a footer cell. */
export type FooterOperation = "add" | "subtract" | "multiply" | "divide";

/**
 * Definition of a single footer cell. Use a plain string for a static label,
 * or an object to aggregate one column / combine several columns arithmetically.
 */
export type FooterCellConfig<T> =
  | string
  | {
      /** Aggregate a single column's numeric values. */
      aggregate?: FooterAggregate;
      /** Column key to aggregate (defaults to the column this cell sits under). */
      column?: string;
      /** Combine the sums of multiple columns with an arithmetic operation. */
      operation?: FooterOperation;
      /** Column keys used by `operation`, combined left-to-right. */
      columns?: string[];
      /** Decimal places for numeric output (defaults to locale formatting). */
      decimals?: number;
      /** Text rendered before the value. */
      prefix?: string;
      /** Text rendered after the value. */
      suffix?: string;
      /** Full custom renderer; receives the filtered row data. Overrides the above. */
      render?: (rows: T[]) => React.ReactNode;
      /** Extra class names applied to the footer cell. */
      className?: string;
    };

/** Definition of one footer row, with cells keyed by column id / accessorKey. */
export type FooterRowConfig<T> = {
  /** Cell definitions keyed by column id / accessorKey. */
  cells: Record<string, FooterCellConfig<T>>;
  /** Extra class names applied to the footer row. */
  className?: string;
};

export type ColumnsProps<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  header: string | (() => React.ReactNode);
  footer?: (row: TData) => React.ReactNode;
  filterFns?: string | "multiSelect";
  draggable?: boolean | undefined;
  headerClassName?: string;
};

export type TableActionMenuProps = {
  items: ActionMenuProps[];
  extraArguments?: any[];
};
