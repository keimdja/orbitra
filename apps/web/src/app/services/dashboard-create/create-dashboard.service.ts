import { Injectable, signal } from '@angular/core';

/** Shared open/closed state for the Create Dashboard modal — triggered from Sidebar, BottomNav, and Home, all rendered outside the modal's own component. */
@Injectable({ providedIn: 'root' })
export class CreateDashboardService {
  private readonly isOpenSignal = signal(false);
  readonly isOpen = this.isOpenSignal.asReadonly();

  open(): void {
    this.isOpenSignal.set(true);
  }

  close(): void {
    this.isOpenSignal.set(false);
  }
}
