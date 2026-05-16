import { Suspense } from 'react';
import ObservationSidebar from '@/components/observations/ObservationSidebar';
import { ObservationCreditBadgeWrapper } from '@/components/observations/ObservationCreditBadgeWrapper';

export default function ObservationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <ObservationSidebar />
      <div className="relative flex-1 overflow-y-auto px-20 pt-25 pb-15">
        <div className="absolute top-6 right-20">
          <Suspense>
            <ObservationCreditBadgeWrapper />
          </Suspense>
        </div>
        {children}
      </div>
    </div>
  );
}
