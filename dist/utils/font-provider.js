'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
const FontContext = createContext(undefined);
export function FontProvider({ children }) {
    const [font, setFont] = useState('Poppins');
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        const storedFont = localStorage.getItem('app-font');
        if (storedFont && ['Poppins', 'Oswald', 'Outfit'].includes(storedFont)) {
            setFont(storedFont);
        }
    }, []);
    useEffect(() => {
        if (!mounted)
            return;
        const fontVariables = {
            Poppins: 'var(--font-poppins)',
            Oswald: 'var(--font-oswald)',
            Outfit: 'var(--font-outfit)',
        };
        document.body.style.fontFamily = fontVariables[font];
        document.documentElement.style.fontFamily = fontVariables[font];
        localStorage.setItem('app-font', font);
        console.log('Font changed to:', font, fontVariables[font]);
    }, [font, mounted]);
    const value = useMemo(() => ({ font, setFont }), [font]);
    return (_jsx(FontContext.Provider, { value: value, children: children }));
}
export const useFont = () => {
    const context = useContext(FontContext);
    if (context === undefined) {
        throw new Error('useFont must be used within a FontProvider');
    }
    return context;
};
