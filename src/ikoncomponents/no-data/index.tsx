import * as React from "react";
import { CircleAlert } from "lucide-react";

export function NoDataComponent({ text }: { text?: string }) {
  return (
    <div className="flex flex-col h-full justify-center text-center gap-2">
      <CircleAlert className="text-muted-foreground mx-auto" size={36} />
      <p className="text-muted-foreground">{text ? text : "No Data Available"}</p>
    </div>
  );
}
