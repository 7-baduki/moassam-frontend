import { cookies } from 'next/headers';
import ObservationSidebarToggle from './ObservationSidebarToggle';
import ObservationSidebarContent from './ObservationSidebarContent';

export default async function ObservationSidebar() {
  const cookieStore = await cookies();
  const isOpen = cookieStore.get('observation-sidebar-open')?.value !== 'false';

  return (
    <aside
      className={`relative hidden h-full flex-col border-r border-black-200 bg-white transition-all duration-300 xl:flex ${isOpen ? 'w-89.25' : 'w-20'}`}
      aria-label="AI 관찰일지 사이드바"
    >
      <ObservationSidebarToggle isOpen={isOpen} />
      {isOpen && <ObservationSidebarContent />}
    </aside>
  );
}
