import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DashboardRepository } from '../../../database/repositories/dashboard.repository';
import type { Dashboard } from '../../../models/dashboard/dashboard.model';
import { CreateDashboardService } from '../../../services/dashboard-create/create-dashboard.service';
import { Icon } from '../../../shared/components/icon/icon';
import { IconTile } from '../../../shared/components/icon-tile/icon-tile';
import { Avatar } from '../../../shared/components/avatar/avatar';
import { Logo } from '../../../shared/components/logo/logo';
import { NAV_ITEMS } from '../nav-items';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, Icon, IconTile, Avatar, Logo],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'hidden md:flex md:w-[74px] lg:w-[248px] flex-none flex-col overflow-hidden border-r border-border bg-surface px-3 py-5 transition-[width] duration-300 ease-in-out',
  },
})
export class Sidebar {
  private readonly dashboardRepository = inject(DashboardRepository);
  protected readonly createDashboardService = inject(CreateDashboardService);

  protected readonly navItems = NAV_ITEMS;
  protected readonly dashboards = signal<Dashboard[]>([]);

  constructor() {
    // Re-fetches whenever the create-dashboard modal closes (also covers the
    // initial load, since isOpen() starts false) — a new dashboard may have
    // just been added, and this is a one-shot list, not a live Dexie query.
    effect(() => {
      if (!this.createDashboardService.isOpen()) {
        this.loadDashboards();
      }
    });
  }

  private loadDashboards(): void {
    this.dashboardRepository.getAll().then((dashboards) => this.dashboards.set(dashboards));
  }
}
