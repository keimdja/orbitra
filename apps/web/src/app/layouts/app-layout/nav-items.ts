export interface NavItem {
  path: string;
  icon: string;
  label: string;
  exactMatch: boolean;
}

// Templates and Design System are deliberately excluded — Templates is out of
// scope for now, and Design System must never appear in production navigation.
export const NAV_ITEMS: NavItem[] = [
  { path: '/', icon: 'home', label: 'Home', exactMatch: true },
  { path: '/search', icon: 'search', label: 'Search', exactMatch: false },
  { path: '/favorites', icon: 'star', label: 'Favorites', exactMatch: false },
  { path: '/settings', icon: 'settings', label: 'Settings', exactMatch: false },
];
