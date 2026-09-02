import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
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
import { observationKeys } from '@/hooks/queries/observations/queryKeys';
import { userKeys } from '@/hooks/queries/user/queryKeys';

export function useObservationRecentQuery(enabled = true) {
  return useQuery({
    queryKey: observationKeys.recent(),
    queryFn: () => getObservations(),
    select: (data) => data.items.slice(0, 4),
    enabled,
  });
}

export function useObservationListQuery(enabled = true) {
  return useInfiniteQuery({
    queryKey: observationKeys.lists(),
    queryFn: ({ pageParam }) => getObservations(pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    enabled,
  });
}

export function useObservationItemQuery(id: number) {
  return useSuspenseQuery({
    queryKey: observationKeys.detail(id),
    queryFn: () => getObservation(id),
  });
}

export function useObservationMutation(
  options?: UseMutationOptions<ObservationCreateResponse, Error, ObservationCreateRequest>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createObservation,
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: userKeys.credits() });
      queryClient.invalidateQueries({ queryKey: observationKeys.all });
      queryClient.invalidateQueries({ queryKey: userKeys.myObservations.all });
      queryClient.invalidateQueries({ queryKey: userKeys.activitySummary() });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useObservationRegenerateMutation(
  options?: UseMutationOptions<ObservationDetailResponse, Error, number>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: regenerateObservation,
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: userKeys.credits() });
      queryClient.invalidateQueries({ queryKey: observationKeys.all });
      queryClient.invalidateQueries({ queryKey: userKeys.myObservations.all });
      queryClient.invalidateQueries({ queryKey: userKeys.activitySummary() });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

export function useObservationDeleteMutation(options?: UseMutationOptions<void, Error, number>) {
  return useMutation({
    mutationFn: deleteObservation,
    ...options,
  });
}
