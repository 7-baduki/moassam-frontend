'use client';

import { ObservationCreditBadge } from '@/components/common/observation-credit-badge/ObservationCreditBadge';
import { useCreditsQuery } from '@/hooks/queries/user/useCredits';

export function ObservationCreditBadgeWrapper() {
  const { data: credits } = useCreditsQuery();

  return <ObservationCreditBadge remainingCount={credits?.balance ?? 0} />;
}
