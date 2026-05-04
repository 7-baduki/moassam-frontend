import ObservationSidebar from '@/components/observations/ObservationSidebar';

export default function ObservationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <ObservationSidebar />
      <div className="flex-1 overflow-y-auto px-20 pt-25">{children}</div>
    </div>
  );
}
