"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const SidebarNavContext = createContext(undefined);
export function SidebarNavProvider({ children }) {
    const [navItems, setNavItems] = useState([]);
    const addNavItem = (item) => {
        setNavItems((prevItems) => {
            const exists = prevItems.some((navItem) => navItem.title === item.title);
            if (exists) {
                return prevItems.map((navItem) => navItem.title === item.title ? Object.assign(Object.assign({}, navItem), item) : navItem);
            }
            return [...prevItems, item];
        });
    };
    const removeNavItem = (title) => {
        setNavItems((prevItems) => prevItems.filter((item) => item.title !== title));
    };
    const updateNavItem = (title, updates) => {
        setNavItems((prevItems) => prevItems.map((item) => item.title === title ? Object.assign(Object.assign({}, item), updates) : item));
    };
    const clearNavItems = () => {
        setNavItems([]);
    };
    return (_jsx(SidebarNavContext.Provider, { value: {
            navItems,
            setNavItems,
            addNavItem,
            removeNavItem,
            updateNavItem,
            clearNavItems,
        }, children: children }));
}
export function useSidebarNav() {
    const context = useContext(SidebarNavContext);
    if (!context) {
        throw new Error('useSidebarNav must be used within a SidebarNavProvider');
    }
    return context;
}
