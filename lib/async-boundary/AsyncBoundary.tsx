'use client';

import { ErrorBoundary, type ErrorBoundaryFallbackProps, Suspense } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import type { ComponentPropsWithoutRef } from 'react';
import { ErrorFallback } from './AsyncBoundaryFallbacks';

type Props = {
  pendingFallback?: ComponentPropsWithoutRef<typeof Suspense>['fallback'];
  rejectedFallback: ComponentPropsWithoutRef<typeof ErrorBoundary>['fallback'];
  authErrorFallback?: boolean;
  children: React.ReactNode;
};

export function AsyncBoundary({
  pendingFallback,
  rejectedFallback,
  authErrorFallback = true,
  children,
}: Props) {
  const router = useRouter();

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallback={(props: ErrorBoundaryFallbackProps) => {
            const { error } = props;
            if (authErrorFallback && axios.isAxiosError(error) && error.response?.status === 401) {
              return (
                <ErrorFallback
                  error={error}
                  title="로그인이 필요해요"
                  description="로그인 후 이용할 수 있어요"
                  actionLabel="돌아가기"
                  onAction={() => router.back()}
                  className="mt-[15vh]"
                />
              );
            }
            if (typeof rejectedFallback === 'function') {
              const RejectedFallback = rejectedFallback;
              return <RejectedFallback {...props} />;
            }
            return rejectedFallback;
          }}
        >
          <Suspense clientOnly fallback={pendingFallback}>
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
