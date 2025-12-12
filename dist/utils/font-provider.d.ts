import React from 'react';
type FontName = 'Poppins' | 'Oswald' | 'Outfit';
interface FontContextType {
    font: FontName;
    setFont: (font: FontName) => void;
}
export declare function FontProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare const useFont: () => FontContextType;
export {};
