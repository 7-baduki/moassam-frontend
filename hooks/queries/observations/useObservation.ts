import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createObservation } from '@/api/observation.api';
import { ObservationRequest, ObservationResponse } from '@/types/observation.type';

export const useObservationMutation = (
  options?: UseMutationOptions<ObservationResponse, Error, ObservationRequest>,
) => {
  return useMutation({
    mutationFn: createObservation,
    ...options,
  });
};
