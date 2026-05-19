import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { logout, withdraw } from '@/api/auth.api';
import { setLoggingOut } from '@/api/axios';
import { useUserStore } from '@/stores/userStore';

export const useLogoutMutation = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: () => {
      setLoggingOut(true);
      return logout();
    },
    onSuccess: (...args) => {
      useUserStore.getState().setUser(null);
      queryClient.clear();
      options?.onSuccess?.(...args);
    },
    onSettled: () => {
      setLoggingOut(false);
    },
  });
};

export const useWithdrawMutation = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: withdraw,
    onSuccess: (...args) => {
      useUserStore.getState().setUser(null);
      queryClient.clear();
      options?.onSuccess?.(...args);
    },
  });
};
