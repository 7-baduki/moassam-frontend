import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { createObservation, getObservation, regenerateObservation } from '@/api/observation.api';
import {
  ObservationCreateRequest,
  ObservationCreateResponse,
  ObservationDetailResponse,
} from '@/types/observation.type';

export const useObservationItemQuery = (id: number) => {
  return useQuery({
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
