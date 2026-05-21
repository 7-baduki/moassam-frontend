import { redirect } from 'next/navigation';
import { getProfile } from '@/api/user-server.api';

export default async function MyPageLayout({ children }: { children: React.ReactNode }) {
  const user = await getProfile();
  if (!user) redirect('/?login=required');

  return <div className="xl:px-20 xl:py-15">{children}</div>;
}
