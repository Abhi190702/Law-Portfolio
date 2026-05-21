import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type LoadingContextValue = {
  isLoading: boolean;
  progress: number;
  setProgress: (value: number) => void;
  setLoaded: (loaded: boolean) => void;
};

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

type LoadingProviderProps = {
  children: ReactNode;
};

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgressState] = useState(0);

  const setProgress = useCallback((value: number) => {
    setProgressState(Math.max(0, Math.min(100, value)));
  }, []);

  const setLoaded = useCallback((loaded: boolean) => {
    setIsLoading(!loaded);
  }, []);

  const value = useMemo<LoadingContextValue>(() => ({
    isLoading,
    progress,
    setProgress,
    setLoaded
  }), [isLoading, progress, setLoaded, setProgress]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}
