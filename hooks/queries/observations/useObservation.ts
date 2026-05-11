import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createObservation } from '@/api/observation.api';
import { ObservationCreateRequest, ObservationCreateResponse } from '@/types/observation.type';

export const useObservationMutation = (
  options?: UseMutationOptions<ObservationCreateResponse, Error, ObservationCreateRequest>,
) => {
  return useMutation({
    mutationFn: createObservation,
    ...options,
  });
};
