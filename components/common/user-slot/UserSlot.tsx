import { UserInitializer } from '@/lib/user-context';
import { getProfile } from '@/api/user-server.api';

export default function UserSlot() {
  const userPromise = getProfile();

  return <UserInitializer userPromise={userPromise} />;
}
