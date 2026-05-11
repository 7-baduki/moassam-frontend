import { useInfiniteQuery, useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
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
  return useQuery({
    queryKey: ['observation', id],
    queryFn: () => getObservation(id),
    enabled: !isNaN(id),
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
