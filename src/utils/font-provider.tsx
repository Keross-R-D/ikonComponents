'use client';

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo
} from 'react';

type FontName = 'Poppins' | 'Oswald' | 'Outfit';

interface FontContextType {
    font: FontName;
    setFont: (font: FontName) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: React.ReactNode }) {
    const [font, setFont] = useState<FontName>('Poppins');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedFont = localStorage.getItem('app-font') as FontName;
        if (storedFont && ['Poppins', 'Oswald', 'Outfit'].includes(storedFont)) {
            setFont(storedFont);
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const fontVariables: Record<FontName, string> = {
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

    return (
        <FontContext.Provider value={value}>
            {children}
        </FontContext.Provider>
    );
}

export const useFont = () => {
    const context = useContext(FontContext);
    if (context === undefined) {
        throw new Error('useFont must be used within a FontProvider');
    }
    return context;
};