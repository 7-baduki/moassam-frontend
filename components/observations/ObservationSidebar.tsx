import { cookies } from 'next/headers';
import ObservationSidebarToggle from './ObservationSidebarToggle';
import ObservationSidebarContent from './ObservationSidebarContent';

// 임시
interface ObservationLog {
  id: string;
  title: string;
}

interface ObservationSidebarProps {
  logs?: ObservationLog[];
}

// 임시
const TEMP_LOGS: ObservationLog[] = [
  { id: '1', title: '자유놀이 시 특정 친구와만 상호작용' },
  { id: '2', title: '친구와 갈등 후 감정 조절 시도' },
  { id: '3', title: '놀이 중 의견 충돌 경험' },
  { id: '4', title: '또래에게 먼저 다가가며 관계 형성' },
];

export default async function ObservationSidebar({ logs = TEMP_LOGS }: ObservationSidebarProps) {
  const cookieStore = await cookies();
  const isOpen = cookieStore.get('observation-sidebar-open')?.value !== 'false';

  return (
    <aside
      className={`relative flex h-full flex-col border-r border-black-200 bg-white transition-all duration-300 ${isOpen ? 'w-89.25' : 'w-20'}`}
      aria-label="AI 관찰일지 사이드바"
    >
      <ObservationSidebarToggle isOpen={isOpen} />
      {isOpen && <ObservationSidebarContent logs={logs} />}
    </aside>
  );
}
