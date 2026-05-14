export function getValidParam<T extends { value: string }>(
  raw: string | null,
  options: T[],
  fallback: string,
): string {
  if (raw && options.some((o) => o.value === raw)) return raw;
  return fallback;
}
