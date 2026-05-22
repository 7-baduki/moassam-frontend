type BoardType = 'moabang' | 'board';

export const communityKeys = {
  postDetail: (postId: number) => ['post', 'detail', postId] as const,
  board: (board: BoardType) => [board] as const,
  postsList: (board: BoardType, params: unknown) => [board, 'posts', params] as const,
  postsInfinite: (board: BoardType, params: unknown) =>
    [board, 'posts', 'infinite', params] as const,
  searchList: (board: BoardType, params: unknown) => [board, 'search', params] as const,
  searchInfinite: (board: BoardType, params: unknown) =>
    [board, 'search', 'infinite', params] as const,
};
