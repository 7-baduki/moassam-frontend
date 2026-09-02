import type { Metadata } from 'next';
import ObservationCreateFormBoundary from '@/components/observations/ObservationCreateFormBoundary';

export const metadata: Metadata = {
  title: '새 관찰일지',
};

export default function ObservationsPage() {
  return <ObservationCreateFormBoundary />;
}
