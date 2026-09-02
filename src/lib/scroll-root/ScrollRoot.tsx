'use client';

import { createContext, useContext, useRef, type ReactNode, type RefObject } from 'react';

const ScrollRootContext = createContext<RefObject<HTMLElement | null> | null>(null);

export function useScrollRoot() {
  return useContext(ScrollRootContext);
}

export function ScrollRoot({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <ScrollRootContext.Provider value={ref}>
      <main ref={ref} className={className}>
        {children}
      </main>
    </ScrollRootContext.Provider>
  );
}
