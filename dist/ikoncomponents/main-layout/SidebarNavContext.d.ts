import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
export interface SidebarNavSubItem {
    title: string;
    url: string;
    isActive?: boolean;
}
export interface SidebarNavItem {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    default?: boolean;
    items?: SidebarNavSubItem[];
}
export interface SidebarNavContextType {
    navItems: SidebarNavItem[];
    setNavItems: (items: SidebarNavItem[]) => void;
    addNavItem: (item: SidebarNavItem) => void;
    removeNavItem: (title: string) => void;
    updateNavItem: (title: string, updates: Partial<SidebarNavItem>) => void;
    clearNavItems: () => void;
}
export declare function SidebarNavProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useSidebarNav(): SidebarNavContextType;
