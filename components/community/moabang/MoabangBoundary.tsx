'use client';

import { Suspense } from 'react';
import MoabangSection from './MoabangSection';

export default function MoabangBoundary() {
  return (
    <Suspense>
      <MoabangSection />
    </Suspense>
  );
}
