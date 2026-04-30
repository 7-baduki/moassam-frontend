import { HotPostSection, ListPostBoundary } from '@/components/comunity/moabang';

export default function MoabangPage() {
  return (
    <div className="flex flex-col gap-25">
      <HotPostSection />
      <ListPostBoundary />
    </div>
  );
}
