import { isDevMode } from '@angular/core';
import { Routes } from '@angular/router';
import { devOnlyGuard } from './core/guards/dev-only.guard';

export const routes: Routes = [
  ...(isDevMode()
    ? [
        {
          path: 'design-system',
          canActivate: [devOnlyGuard],
          loadComponent: () =>
            import('./pages/design-system/design-system').then((module) => module.DesignSystem),
        },
      ]
    : []),
  {
    path: '',
    loadComponent: () =>
      import('./layouts/app-layout/app-layout').then((module) => module.AppLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((module) => module.Home),
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/search/search').then((module) => module.Search),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('./pages/favorites/favorites').then((module) => module.Favorites),
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings').then((module) => module.Settings),
      },
      {
        path: 'dashboards/:dashboardId',
        loadComponent: () =>
          import('./pages/dashboard/dashboard-detail').then((module) => module.DashboardDetail),
      },
      {
        path: 'dashboards/:dashboardId/builder',
        loadComponent: () =>
          import('./pages/dashboard/builder/field-builder').then((module) => module.FieldBuilder),
      },
      {
        path: 'dashboards/:dashboardId/entries/new',
        loadComponent: () =>
          import('./pages/dashboard/entry-form/entry-form').then((module) => module.EntryForm),
      },
      {
        path: 'dashboards/:dashboardId/entries/:entryId/edit',
        loadComponent: () =>
          import('./pages/dashboard/entry-form/entry-form').then((module) => module.EntryForm),
      },
      {
        path: 'dashboards/:dashboardId/entries/:entryId',
        loadComponent: () =>
          import('./pages/dashboard/entry-detail/entry-detail').then(
            (module) => module.EntryDetail,
          ),
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
