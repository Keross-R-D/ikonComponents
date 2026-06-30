"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SidebarExpandedContextValue {
  /** Whether the main sidebar rail is expanded into its labeled-panel state. */
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  toggle: () => void;
}

const SidebarExpandedContext = createContext<SidebarExpandedContextValue>({
  expanded: false,
  setExpanded: () => {},
  toggle: () => {},
});

/**
 * Provides the main sidebar's expanded/collapsed state to the whole layout so
 * that siblings of the rail (app sidebar, header, content, footer) can shift to
 * make room for the expanded panel instead of being covered by it.
 */
export function SidebarExpandedProvider({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <SidebarExpandedContext.Provider
      value={{
        expanded,
        setExpanded,
        toggle: () => setExpanded((prev) => !prev),
      }}
    >
      {children}
    </SidebarExpandedContext.Provider>
  );
}

/** Full state + setters for the rail (used by the rail itself). */
export const useSidebarExpandedState = () => useContext(SidebarExpandedContext);

/** Convenience hook returning just the boolean (used by rail items / layout). */
export const useSidebarExpanded = () => useContext(SidebarExpandedContext).expanded;
