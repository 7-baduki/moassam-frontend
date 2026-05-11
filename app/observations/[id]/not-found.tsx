import NotFoundFallback from '@/components/common/not-found/NotFoundFallback';

export default function ObservationNotFound() {
  return (
    <NotFoundFallback
      description="존재하지 않는 관찰일지예요"
      href="/observations"
      actionLabel="돌아가기"
    />
  );
}
