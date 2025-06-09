/**
 * Hook to decide release success.
 * Returns true if release succeeds (50%).
 */
export function useReleaseChance(): boolean {
  return Math.random() < 0.5;
}
