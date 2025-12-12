import React from 'react';
type RadiusValue = 0 | 0.25 | 0.5 | 0.75 | 1;
interface RadiusContextType {
    radius: RadiusValue;
    setRadius: (radius: RadiusValue) => void;
}
export declare function RadiusProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare const useRadius: () => RadiusContextType;
export {};
