'use client';

import { usePathname } from 'next/navigation';
import { ObservationCreditBadge } from '@/components/common/observation-credit-badge/ObservationCreditBadge';
import { useCreditsQuery } from '@/hooks/queries/user';
import { useUserStore } from '@/stores/userStore';
import { useObservationStore } from '@/stores/observationStore';

export function ObservationCreditBadgeWrapper() {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const { data: credits } = useCreditsQuery(!!user);
  const isGenerating = useObservationStore((state) => state.isGenerating);

  if (!user) return null;
  if (pathname !== '/observations') return null;
  if (isGenerating) return null;

  return <ObservationCreditBadge remainingCount={credits?.balance ?? 0} />;
}
