import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DashboardRepository } from '../../../database/repositories/dashboard.repository';
import type { Dashboard } from '../../../models/dashboard/dashboard.model';
import { Icon } from '../../../shared/components/icon/icon';
import { IconTile } from '../../../shared/components/icon-tile/icon-tile';
import { Avatar } from '../../../shared/components/avatar/avatar';
import { NAV_ITEMS } from '../nav-items';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, Icon, IconTile, Avatar],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'hidden md:flex md:w-[74px] lg:w-[248px] flex-none flex-col overflow-hidden border-r border-border bg-surface px-3 py-5 transition-[width] duration-300 ease-in-out',
  },
})
export class Sidebar {
  private readonly dashboardRepository = inject(DashboardRepository);

  protected readonly navItems = NAV_ITEMS;
  protected readonly dashboards = signal<Dashboard[]>([]);

  constructor() {
    this.dashboardRepository.getAll().then((dashboards) => this.dashboards.set(dashboards));
  }
}
