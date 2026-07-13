/**
 * Dashboard/entry accent colors are arbitrary user-chosen hex values, so their
 * "weak" (low-opacity) backgrounds can't be precomputed as fixed theme tokens
 * or static Tailwind classes — they're composed at render time instead.
 */
export function hexWithAlpha(hex: string, alpha: number): string {
  const hexClean = hex.replace('#', '');
  const red = parseInt(hexClean.substring(0, 2), 16);
  const green = parseInt(hexClean.substring(2, 4), 16);
  const blue = parseInt(hexClean.substring(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
