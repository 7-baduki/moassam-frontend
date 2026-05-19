'use client';

import { usePathname } from 'next/navigation';
import { ObservationCreditBadge } from '@/components/common/observation-credit-badge/ObservationCreditBadge';
import { useCreditsQuery } from '@/hooks/queries/user/useCredits';
import { useUserStore } from '@/stores/userStore';

export function ObservationCreditBadgeWrapper() {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const { data: credits } = useCreditsQuery(!!user);

  if (!user) return null;
  if (pathname !== '/observations') return null;

  return <ObservationCreditBadge remainingCount={credits?.balance ?? 0} />;
}
