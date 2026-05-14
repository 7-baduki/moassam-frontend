import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { logout } from '@/api/auth.api';

export const useLogoutMutation = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    ...options,
    onSuccess: (...args) => {
      queryClient.clear();
      options?.onSuccess?.(...args);
    },
  });
};
