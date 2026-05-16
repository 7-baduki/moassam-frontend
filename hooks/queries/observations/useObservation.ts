import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  UseMutationOptions,
  useSuspenseQuery,
} from '@tanstack/react-query';
import {
  createObservation,
  deleteObservation,
  getObservation,
  getObservations,
  regenerateObservation,
} from '@/api/observation.api';
import {
  ObservationCreateRequest,
  ObservationCreateResponse,
  ObservationDetailResponse,
} from '@/types/observation.type';

export const useObservationRecentQuery = () => {
  return useQuery({
    queryKey: ['observations', 'recent'],
    queryFn: () => getObservations(),
    select: (data) => data.items.slice(0, 4),
  });
};

export const useObservationListQuery = () => {
  return useInfiniteQuery({
    queryKey: ['observations'],
    queryFn: ({ pageParam }) => getObservations(pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
  });
};

export const useObservationItemQuery = (id: number) => {
  return useSuspenseQuery({
    queryKey: ['observation', id],
    queryFn: () => getObservation(id),
  });
};

export const useObservationMutation = (
  options?: UseMutationOptions<ObservationCreateResponse, Error, ObservationCreateRequest>,
) => {
  return useMutation({
    mutationFn: createObservation,
    ...options,
  });
};

export const useObservationRegenerateMutation = (
  options?: UseMutationOptions<ObservationDetailResponse, Error, number>,
) => {
  return useMutation({
    mutationFn: regenerateObservation,
    ...options,
  });
};

export const useObservationDeleteMutation = (options?: UseMutationOptions<void, Error, number>) => {
  return useMutation({
    mutationFn: deleteObservation,
    ...options,
  });
};
