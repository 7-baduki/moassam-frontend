export const userKeys = {
  credits: () => ['credits'] as const,
  activitySummary: () => ['activitySummary'] as const,
  myObservations: {
    all: ['myObservations'] as const,
    page: (page: number) => ['myObservations', page] as const,
    infinite: () => ['myObservations', 'infinite'] as const,
  },
  myBookmarks: {
    all: ['myBookmarks'] as const,
    page: (page: number) => ['myBookmarks', page] as const,
    infinite: () => ['myBookmarks', 'infinite'] as const,
  },
  myComments: {
    all: ['myComments'] as const,
    page: (page: number) => ['myComments', page] as const,
    infinite: () => ['myComments', 'infinite'] as const,
  },
  myMoabangPosts: {
    all: ['myMoabangPosts'] as const,
    page: (page: number) => ['myMoabangPosts', page] as const,
    infinite: () => ['myMoabangPosts', 'infinite'] as const,
  },
  myFreePosts: {
    all: ['myFreePosts'] as const,
    page: (page: number) => ['myFreePosts', page] as const,
    infinite: () => ['myFreePosts', 'infinite'] as const,
  },
};
