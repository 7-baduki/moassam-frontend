'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import type { ComponentPropsWithoutRef } from 'react';

type Props = {
  pendingFallback?: ComponentPropsWithoutRef<typeof Suspense>['fallback'];
  rejectedFallback: ComponentPropsWithoutRef<typeof ErrorBoundary>['fallback'];
  children: React.ReactNode;
};

export function AsyncBoundary({ pendingFallback, rejectedFallback, children }: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={rejectedFallback} onReset={reset}>
          <Suspense fallback={pendingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
