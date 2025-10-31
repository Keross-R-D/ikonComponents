import { jsx as _jsx } from "react/jsx-runtime";
import { Skeleton } from "../../shadcn/skeleton";
export function SkeletonWidget({ count }) {
    return (_jsx("div", { className: 'flex flex-row gap-3 w-full', children: count > 0 && Array.from({ length: count }).map((_, index) => (_jsx(Skeleton, { className: "w-1/" + count + " flex flex-col md:flex-row gap-2 h-20", children: _jsx("div", { className: "flex flex-1 flex-row justify-between border rounded-md p-2 bg-card-new" }) }, 'widget_' + index))) }));
}
