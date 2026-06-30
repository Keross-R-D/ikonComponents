import { DataTable } from "./DataTable";
import type { DataTableLayoutProps } from "./type";

export function DataTableLayout<T>({
  data,
  columns,
  extraTools,
}: DataTableLayoutProps<T>) {
  return (
    <DataTable
      data={data}
      columns={columns}
      extraTools={extraTools}
    />
  );
}
