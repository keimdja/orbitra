const MILLISECONDS_PER_DAY = 86_400_000;

export function formatRelativeTime(date: Date): string {
  const daysAgo = Math.round((Date.now() - date.getTime()) / MILLISECONDS_PER_DAY);

  if (daysAgo <= 0) return 'today';
  if (daysAgo === 1) return 'yesterday';
  if (daysAgo < 7) return `${daysAgo} days ago`;
  if (daysAgo < 14) return 'last week';
  if (daysAgo < 45) return `${Math.round(daysAgo / 7)} weeks ago`;
  return `${Math.round(daysAgo / 30)} months ago`;
}
