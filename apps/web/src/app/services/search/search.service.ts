import { Injectable, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/**
 * Search is contextual to whichever page is currently mounted (e.g. Home
 * filters dashboards, Favorites filters favorited dashboards) rather than a
 * dedicated global search page — so the query resets on navigation instead
 * of silently carrying over and pre-filtering a page the user didn't type
 * into.
 */
@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly router = inject(Router);

  private readonly querySignal = signal('');
  readonly query = this.querySignal.asReadonly();

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.clear());
  }

  setQuery(value: string): void {
    this.querySignal.set(value);
  }

  clear(): void {
    this.querySignal.set('');
  }
}
