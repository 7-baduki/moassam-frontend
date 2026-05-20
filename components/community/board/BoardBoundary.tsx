'use client';

import { Suspense } from 'react';
import BoardSection from './BoardSection';

export default function BoardBoundary() {
  return (
    <Suspense fallback={null}>
      <BoardSection />
    </Suspense>
  );
}
