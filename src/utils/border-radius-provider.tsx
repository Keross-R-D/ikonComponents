'use client';

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo
} from 'react';

type RadiusValue = 0 | 0.25 | 0.5 | 0.75 | 1;

interface RadiusContextType {
    radius: RadiusValue;
    setRadius: (radius: RadiusValue) => void;
}

const RadiusContext = createContext<RadiusContextType | undefined>(undefined);

export function RadiusProvider({ children }: { children: React.ReactNode }) {
    const [radius, setRadius] = useState<RadiusValue>(0.5);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedRadius = localStorage.getItem('app-radius');
        if (storedRadius) {
            const parsed = parseFloat(storedRadius) as RadiusValue;
            if ([0, 0.25, 0.5, 0.75, 1].includes(parsed)) {
                setRadius(parsed);
            }
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const radiusInRem = radius === 0 ? '0rem' : `${radius}rem`;
        document.documentElement.style.setProperty('--radius', radiusInRem);
        localStorage.setItem('app-radius', radius.toString());
        console.log('Radius changed to:', radius, radiusInRem);
    }, [radius, mounted]);

    const value = useMemo(() => ({ radius, setRadius }), [radius]);

    return (
        <RadiusContext.Provider value={value}>
            {children}
        </RadiusContext.Provider>
    );
}

export const useRadius = () => {
    const context = useContext(RadiusContext);
    if (context === undefined) {
        throw new Error('useRadius must be used within a RadiusProvider');
    }
    return context;
};