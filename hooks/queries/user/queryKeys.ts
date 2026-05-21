export const userKeys = {
  credits: () => ['credits'] as const,
  activitySummary: () => ['activitySummary'] as const,
  myObservations: {
    all: ['myObservations'] as const,
    page: (page: number) => ['myObservations', page] as const,
    infinite: () => ['myObservations', 'infinite'] as const,
  },
};
