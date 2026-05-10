import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { logout } from '@/api/auth.api';

export const useLogoutMutation = (options?: UseMutationOptions) => {
  return useMutation({
    mutationFn: logout,
    ...options,
  });
};
