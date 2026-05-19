'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Pagination from '@/components/common/pagination/Pagination';
import {
  useMyObservationsQuery,
  useMyObservationsInfiniteQuery,
} from '@/hooks/queries/user/useMyObservations';
import { useObservationDeleteMutation } from '@/hooks/queries/observations/useObservation';
import { AGE_OPTIONS } from '@/constants/observations/observation';
import { MoreButton } from '@/components/common/more-button/MoreButton';
import { EmptyState } from '@/components/common/empty-state/EmptyState';
import { Dialog } from '@/components/common/dialog/Dialog';
import { useQueryClient } from '@tanstack/react-query';
import { useIsDesktop } from '@/hooks/useIsMobile';
import { toast } from '@/utils/toast';
import { MyObservationListItem } from '@/types/observation.type';

const CURRICULUM_LABEL: Record<string, string> = {
  NURI: '개정 누리과정',
  STANDARD: '개정 표준보육과정',
};

function formatDate(dateStr: string) {
  return dateStr.slice(0, 10).replace(/-/g, '.');
}

function ObservationItem({
  observation,
  onDelete,
}: {
  observation: MyObservationListItem;
  onDelete: (id: number) => void;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="flex items-center rounded-[10px] bg-white px-5 py-3 transition-colors hover:bg-black-200">
        <Link
          href={`/observations/${observation.observationId}`}
          className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-center"
        >
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-black-800">
            {observation.title}
          </span>
          <div className="flex items-center gap-2 text-xs font-medium text-black-500 md:pl-10">
            <span>
              {AGE_OPTIONS.find((o) => o.value === observation.age)?.label ?? observation.age}
            </span>
            <span className="w-21.75">
              {CURRICULUM_LABEL[observation.curriculumType] ?? observation.curriculumType}
            </span>
            <span>{formatDate(observation.createdAt)}</span>
          </div>
        </Link>
        <MoreButton className="ml-5" onDelete={() => setShowDeleteDialog(true)} />
      </div>
      <Dialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        iconType="trash"
        title="관찰일지를 삭제할까요?"
        description="삭제한 관찰일지는 다시 복구할 수 없어요"
        buttons={[
          {
            children: '취소',
            variant: 'outline',
            onClick: () => setShowDeleteDialog(false),
          },
          {
            children: '삭제',
            onClick: () => {
              setShowDeleteDialog(false);
              onDelete(observation.observationId);
            },
          },
        ]}
      />
    </>
  );
}

function ObservationsPaginated() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(0);
  const { data, refetch } = useMyObservationsQuery(currentPage);

  const { mutate: handleDelete } = useObservationDeleteMutation({
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ['observations'] });
      toast.success({
        title: '관찰일지 삭제가 완료되었어요',
        description: '삭제된 관찰일지는 복구할 수 없어요',
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.isHandled) return;
      toast.error({ title: '삭제 실패', description: '잠시 후 다시 시도해주세요' });
    },
  });

  const isEmpty = !data?.data || data.data.length === 0;

  return (
    <div className="flex flex-col gap-5">
      {isEmpty ? (
        <div className="flex flex-1 items-center justify-center py-20">
          <EmptyState
            message="아직 생성한 관찰일지가 없어요"
            description="첫 관찰일지를 만들어보세요"
            actionLabel="관찰일지 생성하기"
            onAction={() => router.push('/observations')}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 px-4 md:px-9 xl:px-0">
            {data?.data.map((observation) => (
              <ObservationItem
                key={observation.observationId}
                observation={observation}
                onDelete={handleDelete}
              />
            ))}
          </div>
          <div className="flex justify-center pt-12">
            <Pagination
              currentPage={currentPage + 1}
              totalPages={data?.totalPages ?? 1}
              onChange={(page) => setCurrentPage(page - 1)}
            />
          </div>
        </>
      )}
    </div>
  );
}

function ObservationsInfinite() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useMyObservationsInfiniteQuery();

  const { mutate: handleDelete } = useObservationDeleteMutation({
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ['observations'] });
      toast.success({
        title: '관찰일지 삭제가 완료되었어요',
        description: '삭제된 관찰일지는 복구할 수 없어요',
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.isHandled) return;
      toast.error({ title: '삭제 실패', description: '잠시 후 다시 시도해주세요' });
    },
  });

  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [handleObserver]);

  const allItems = data.pages.flatMap((page) => page.data);
  const isEmpty = allItems.length === 0;

  return (
    <div className="flex flex-col gap-5">
      {isEmpty ? (
        <div className="flex flex-1 items-center justify-center py-20">
          <EmptyState
            message="아직 생성한 관찰일지가 없어요"
            description="첫 관찰일지를 만들어보세요"
            actionLabel="관찰일지 생성하기"
            onAction={() => router.push('/observations')}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-4 pb-5 md:px-9 xl:px-0">
          {allItems.map((observation) => (
            <ObservationItem
              key={observation.observationId}
              observation={observation}
              onDelete={handleDelete}
            />
          ))}
          <div ref={observerRef} className="h-1" />
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-black-300 border-t-black-800" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ObservationsSection() {
  const isDesktop = useIsDesktop();

  return isDesktop ? <ObservationsPaginated /> : <ObservationsInfinite />;
}
