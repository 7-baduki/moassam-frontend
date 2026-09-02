export const observationKeys = {
  all: ['observations'] as const,
  lists: () => [...observationKeys.all] as const,
  recent: () => [...observationKeys.all, 'recent'] as const,
  detail: (id: number) => ['observation', id] as const,
};
