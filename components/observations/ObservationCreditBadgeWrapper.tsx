'use client';

import { usePathname } from 'next/navigation';
import { ObservationCreditBadge } from '@/components/common/observation-credit-badge/ObservationCreditBadge';
import { useCreditsQuery } from '@/hooks/queries/user/useCredits';

export function ObservationCreditBadgeWrapper() {
  const pathname = usePathname();
  const { data: credits } = useCreditsQuery();

  if (pathname !== '/observations') return null;

  return <ObservationCreditBadge remainingCount={credits?.balance ?? 0} />;
}
