import { ReactNode } from 'react';
export interface BreadcrumbItemProps {
    title: string;
    href?: string;
    level: number;
}
interface BreadcrumbContextType {
    breadcrumbItems: BreadcrumbItemProps[];
    addBreadcrumb: (item: BreadcrumbItemProps) => void;
    backBreadcrumb: (item: BreadcrumbItemProps) => void;
}
export declare function BreadcrumbProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useBreadcrumb(): BreadcrumbContextType;
export {};
