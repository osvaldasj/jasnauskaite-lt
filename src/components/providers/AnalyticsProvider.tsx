'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { usePathname } from 'next/navigation';
import {
  trackPageView,
  trackFormStart,
  trackFormStep,
  trackFormComplete,
  trackFormAbandon,
  trackClick,
  setupScrollTracking,
  flushEvents,
} from '@/lib/analytics';

interface AnalyticsContextValue {
  trackFormStart: (formName: string) => void;
  trackFormStep: (formName: string, step: number) => void;
  trackFormComplete: (formName: string) => void;
  trackFormAbandon: (formName: string, lastStep: number) => void;
  trackClick: (elementId: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue>({
  trackFormStart: () => {},
  trackFormStep: () => {},
  trackFormComplete: () => {},
  trackFormAbandon: () => {},
  trackClick: () => {},
});

export function useAnalytics(): AnalyticsContextValue {
  return useContext(AnalyticsContext);
}

interface Props {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: Props) {
  const pathname = usePathname();
  const activeFormsRef = useRef<Map<string, number>>(new Map());

  // Track page views on route change
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  // Setup scroll tracking
  useEffect(() => {
    const cleanup = setupScrollTracking();
    return cleanup;
  }, [pathname]);

  // Handle form abandonment on page unload
  useEffect(() => {
    const handleUnload = () => {
      activeFormsRef.current.forEach((lastStep, formName) => {
        trackFormAbandon(formName, lastStep);
      });
      flushEvents();
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  // Memoized tracking functions
  const handleFormStart = useCallback((formName: string) => {
    activeFormsRef.current.set(formName, 0);
    trackFormStart(formName);
  }, []);

  const handleFormStep = useCallback((formName: string, step: number) => {
    activeFormsRef.current.set(formName, step);
    trackFormStep(formName, step);
  }, []);

  const handleFormComplete = useCallback((formName: string) => {
    activeFormsRef.current.delete(formName);
    trackFormComplete(formName);
  }, []);

  const handleFormAbandon = useCallback((formName: string, lastStep: number) => {
    activeFormsRef.current.delete(formName);
    trackFormAbandon(formName, lastStep);
  }, []);

  const handleClick = useCallback((elementId: string) => {
    trackClick(elementId);
  }, []);

  const value: AnalyticsContextValue = {
    trackFormStart: handleFormStart,
    trackFormStep: handleFormStep,
    trackFormComplete: handleFormComplete,
    trackFormAbandon: handleFormAbandon,
    trackClick: handleClick,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}
