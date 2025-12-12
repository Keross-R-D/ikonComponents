import * as React from "react";
export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    className?: string;
}
export interface LoadingSpinnerProps extends ISVGProps {
    visible?: boolean;
}
export declare const LoadingSpinner: ({ size, className, visible, ...props }: LoadingSpinnerProps) => import("react/jsx-runtime").JSX.Element | null;
