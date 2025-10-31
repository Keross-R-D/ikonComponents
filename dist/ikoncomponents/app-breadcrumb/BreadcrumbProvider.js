"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
// Create the context with a default value
const BreadcrumbContext = createContext(undefined);
// Create a provider component
export function BreadcrumbProvider({ children }) {
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);
    // Function to add a breadcrumb item
    const addBreadcrumb = (item) => {
        setBreadcrumbItems((prevItems) => {
            const filterState = prevItems.filter((e) => e.level < item.level);
            return [...filterState, item];
        });
    };
    // Function to go back in the breadcrumb
    const backBreadcrumb = (item) => {
        setBreadcrumbItems((prevItems) => {
            const filterState = prevItems.filter((e) => e.level <= item.level);
            return [...filterState];
        });
    };
    return (_jsx(BreadcrumbContext.Provider, { value: { breadcrumbItems, addBreadcrumb, backBreadcrumb }, children: children }));
}
// Custom hook to use the BreadcrumbContext
export function useBreadcrumb() {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
    }
    return context;
}
