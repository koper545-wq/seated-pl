"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const MVP_MODE_KEY = "seated-mvp-mode";

interface MVPModeContextType {
  mvpMode: boolean;
  /** Alias: true = demo mode (mock data), false = real/live mode */
  isDemoMode: boolean;
  toggleMVPMode: () => void;
  setMVPMode: (enabled: boolean) => void;
  isLoaded: boolean;
}

const MVPModeContext = createContext<MVPModeContextType | undefined>(undefined);

export function MVPModeProvider({ children }: { children: React.ReactNode }) {
  const [mvpMode, setMVPModeState] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load MVP mode from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(MVP_MODE_KEY);
      if (stored !== null) {
        setMVPModeState(stored === "true");
      }
    } catch (error) {
      console.error("Failed to load MVP mode from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  const setMVPMode = useCallback((enabled: boolean) => {
    try {
      localStorage.setItem(MVP_MODE_KEY, enabled ? "true" : "false");
      setMVPModeState(enabled);
      // Reload to apply changes across the app
      window.location.reload();
    } catch (error) {
      console.error("Failed to save MVP mode to localStorage:", error);
    }
  }, []);

  const toggleMVPMode = useCallback(() => {
    setMVPMode(!mvpMode);
  }, [mvpMode, setMVPMode]);

  return (
    <MVPModeContext.Provider
      value={{
        mvpMode,
        isDemoMode: mvpMode,
        toggleMVPMode,
        setMVPMode,
        isLoaded,
      }}
    >
      {children}
    </MVPModeContext.Provider>
  );
}

export function useMVPMode(): MVPModeContextType {
  const context = useContext(MVPModeContext);
  if (context === undefined) {
    throw new Error("useMVPMode must be used within an MVPModeProvider");
  }
  return context;
}

/** Alias for useMVPMode - same hook, friendlier name */
export const useDemoMode = useMVPMode;

// Get MVP mode from localStorage (for non-hook usage)
export function getMVPMode(): boolean {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem(MVP_MODE_KEY);
  return stored === null ? true : stored === "true";
}
