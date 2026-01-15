import React, { createContext, useContext, useState, useCallback } from 'react';

interface RefreshContextType {
  refresh: () => void;
  refreshCounter: number;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export function RefreshProvider({ children }: { children: React.ReactNode }) {
  const [refreshCounter, setRefreshCounter] = useState(0);

  const refresh = useCallback(() => {
    setRefreshCounter((prev) => prev + 1);
  }, []);

  return (
    <RefreshContext.Provider value={{ refresh, refreshCounter }}>
      {children}
    </RefreshContext.Provider>
  );
}

export function useRefresh() {
  const context = useContext(RefreshContext);
  if (context === undefined) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }
  return context;
}