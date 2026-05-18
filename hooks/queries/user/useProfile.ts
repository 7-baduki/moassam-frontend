import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { updateProfile } from '@/api/user.api';
import { User } from '@/types/user.type';

export function useProfileMutation(options?: UseMutationOptions<User, Error, string>) {
  return useMutation({
    ...options,
    mutationFn: updateProfile,
  });
}
