import ObservationSidebar from '@/components/observations/ObservationSidebar';
import { ObservationCreditBadgeWrapper } from '@/components/observations/ObservationCreditBadgeWrapper';

export default function ObservationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <ObservationSidebar />
      <div className="relative flex-1 overflow-y-auto">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 md:top-5 md:right-8 md:left-auto md:translate-x-0 xl:top-6 xl:right-20">
          <ObservationCreditBadgeWrapper />
        </div>
        <div className="px-4 py-16 md:px-9 md:py-18 xl:px-20 xl:pt-25 xl:pb-15">{children}</div>
      </div>
    </div>
  );
}
