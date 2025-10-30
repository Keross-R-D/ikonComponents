import React from "react";
import { buttonVariants } from "../../shadcn/button";
import { type VariantProps } from "class-variance-authority";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    children: React.ReactNode;
    asChild?: boolean;
}
export interface ButtonWithTooltipProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    children: React.ReactNode;
    asChild?: boolean;
    tooltipContent: string | React.ReactNode;
}
export declare function TextButton({ children, variant, asChild, size, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export declare function TextButtonWithTooltip({ children, variant, asChild, size, tooltipContent, ...props }: ButtonWithTooltipProps): import("react/jsx-runtime").JSX.Element;
export declare function IconTextButton({ children, variant, asChild, size, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export declare function IconTextButtonWithTooltip({ children, variant, size, asChild, tooltipContent, ...props }: ButtonWithTooltipProps): import("react/jsx-runtime").JSX.Element;
export declare function IconButton({ children, variant, size, asChild, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export declare function IconButtonWithTooltip({ children, tooltipContent, asChild, variant, size, ...props }: ButtonWithTooltipProps): import("react/jsx-runtime").JSX.Element;
