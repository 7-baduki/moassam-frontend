import { Suspense } from 'react';
import ObservationSidebar from '@/components/observations/ObservationSidebar';
import { ObservationCreditBadgeWrapper } from '@/components/observations/ObservationCreditBadgeWrapper';

export default function ObservationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <Suspense fallback={null}>
        <ObservationSidebar />
      </Suspense>
      <div className="relative flex-1 overflow-y-auto">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 md:top-5 md:right-8 md:left-auto md:translate-x-0 xl:top-6 xl:right-20">
          <Suspense fallback={null}>
            <ObservationCreditBadgeWrapper />
          </Suspense>
        </div>
        <div className="p-4 md:p-9 xl:p-20">{children}</div>
      </div>
    </div>
  );
}
