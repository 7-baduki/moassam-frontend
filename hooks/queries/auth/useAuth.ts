import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { logout } from '@/api/auth.api';

export const useLogoutMutation = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: logout,
    onSuccess: (...args) => {
      queryClient.clear();
      options?.onSuccess?.(...args);
    },
  });
};
