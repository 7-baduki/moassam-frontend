import { HotPostSection, ListPostSection } from '@/components/comunity/moabang';

export default function MoabangPage() {
  return (
    <div className="flex flex-col gap-6">
      <HotPostSection />
      <ListPostSection />
    </div>
  );
}
