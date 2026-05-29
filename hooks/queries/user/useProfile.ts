import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@/api/user.api';
import { communityKeys } from '@/hooks/queries/community/queryKeys';

export function useProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityKeys.board('moabang') });
      queryClient.invalidateQueries({ queryKey: communityKeys.board('board') });
      queryClient.invalidateQueries({ queryKey: ['post', 'detail'] });
    },
  });
}
