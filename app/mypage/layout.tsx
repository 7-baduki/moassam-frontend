import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { getProfile } from '@/api/user-server.api';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="xl:px-20 xl:py-15">
      <Suspense fallback={null}>
        <MyPageAuthGuard>{children}</MyPageAuthGuard>
      </Suspense>
    </div>
  );
}

async function MyPageAuthGuard({ children }: { children: React.ReactNode }) {
  const user = await getProfile();
  if (!user) redirect('/?login=required');

  return children;
}
