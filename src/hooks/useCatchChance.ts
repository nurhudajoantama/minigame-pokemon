/**
 * Hook to decide catch success.
 * Returns true if catch succeeds (30%).
 */
export function useCatchChance(): boolean {
  return Math.random() < 0.3;
}
