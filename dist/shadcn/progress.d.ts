import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
    value?: number;
    indicatorColor?: string;
}
declare function Progress({ className, value, indicatorColor, ...props }: ProgressProps): import("react/jsx-runtime").JSX.Element;
export { Progress };
