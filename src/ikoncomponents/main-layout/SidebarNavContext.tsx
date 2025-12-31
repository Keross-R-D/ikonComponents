"use client"
import { createContext, useContext, useState, ReactNode } from 'react';
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
    header?: ReactNode;
    footer?: ReactNode;
}

export interface SidebarNavContextType {
    navItems: SidebarNavItem[];
    header: ReactNode | null;
    footer: ReactNode | null;
    setNavItems: (items: SidebarNavItem[]) => void;
    addNavItem: (item: SidebarNavItem) => void;
    removeNavItem: (title: string) => void;
    updateNavItem: (title: string, updates: Partial<SidebarNavItem>) => void;
    clearNavItems: () => void;
    setSidebarHeader: (header: ReactNode) => void;
    setSidebarFooter: (footer: ReactNode) => void;
}

const SidebarNavContext = createContext<SidebarNavContextType | undefined>(undefined);

export function SidebarNavProvider({ children }: { children: ReactNode }) {
    const [navItems, setNavItems] = useState<SidebarNavItem[]>([]);
    const [header, setHeader] = useState<ReactNode | null>(null);
    const [footer, setFooter] = useState<ReactNode | null>(null);

    const addNavItem = (item: SidebarNavItem) => {
        setNavItems((prevItems) => {
            const exists = prevItems.some((navItem) => navItem.title === item.title);
            if (exists) {
                return prevItems.map((navItem) =>
                    navItem.title === item.title ? { ...navItem, ...item } : navItem
                );
            }
            return [...prevItems, item];
        });
    };

    const removeNavItem = (title: string) => {
        setNavItems((prevItems) => prevItems.filter((item) => item.title !== title));
    };

    const updateNavItem = (title: string, updates: Partial<SidebarNavItem>) => {
        setNavItems((prevItems) =>
            prevItems.map((item) =>
                item.title === title ? { ...item, ...updates } : item
            )
        );
    };

    const setSidebarHeader = (header: ReactNode) => {
        setHeader(header);
    };
    const setSidebarFooter = (footer: ReactNode) => {
        setFooter(footer);
    };

    const clearNavItems = () => {
        setNavItems([]);
    };

    return (
        <SidebarNavContext.Provider
            value={{
                navItems,
                header,
                footer,
                setNavItems,
                addNavItem,
                removeNavItem,
                updateNavItem,
                clearNavItems,
                setSidebarHeader,
                setSidebarFooter,
            }}
        >
            {children}
        </SidebarNavContext.Provider>
    );
}

export function useSidebarNav() {
    const context = useContext(SidebarNavContext);
    if (!context) {
        throw new Error('useSidebarNav must be used within a SidebarNavProvider');
    }
    return context;
}