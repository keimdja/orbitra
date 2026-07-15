import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardRepository } from '../../database/repositories/dashboard.repository';
import { EntryRepository } from '../../database/repositories/entry.repository';
import { formatRelativeTime } from '../../core/utils/date.util';
import { CreateDashboardService } from '../../services/dashboard-create/create-dashboard.service';
import { SearchService } from '../../services/search/search.service';
import { CurrentUserService } from '../../services/user/current-user.service';
import { Icon } from '../../shared/components/icon/icon';
import { IconTile } from '../../shared/components/icon-tile/icon-tile';

interface HomeDashboardCard {
  id: string;
  name: string;
  description: string;
  icon: string;
  accent: string;
  favorite: boolean;
  entryCount: number;
  updatedLabel: string;
}

const MORNING_HOUR_LIMIT = 12;
const AFTERNOON_HOUR_LIMIT = 18;

@Component({
  selector: 'app-home',
  imports: [RouterLink, Icon, IconTile],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly dashboardRepository = inject(DashboardRepository);
  private readonly entryRepository = inject(EntryRepository);
  private readonly currentUserService = inject(CurrentUserService);
  protected readonly searchService = inject(SearchService);
  protected readonly createDashboardService = inject(CreateDashboardService);

  protected readonly cards = signal<HomeDashboardCard[]>([]);
  protected readonly firstName = signal('');

  protected readonly filteredCards = computed(() => {
    const query = this.searchService.query().trim().toLowerCase();
    if (!query) {
      return this.cards();
    }
    return this.cards().filter(
      (card) =>
        card.name.toLowerCase().includes(query) || card.description.toLowerCase().includes(query),
    );
  });

  protected readonly dashboardCount = computed(() => this.cards().length);
  protected readonly totalEntries = computed(() =>
    this.cards().reduce((total, card) => total + card.entryCount, 0),
  );

  protected readonly greeting = computed(() => {
    const hour = new Date().getHours();
    const timeOfDay =
      hour < MORNING_HOUR_LIMIT ? 'morning' : hour < AFTERNOON_HOUR_LIMIT ? 'afternoon' : 'evening';
    const name = this.firstName();
    return name ? `Good ${timeOfDay}, ${name}` : `Good ${timeOfDay}`;
  });

  protected readonly todayLabel = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  constructor() {
    this.loadDashboards();
    this.loadFirstName();
  }

  protected onSearchInput(event: Event): void {
    this.searchService.setQuery((event.target as HTMLInputElement).value);
  }

  protected async toggleFavorite(dashboardId: string, event: Event): Promise<void> {
    event.stopPropagation();
    event.preventDefault();
    const card = this.cards().find((existing) => existing.id === dashboardId);
    if (!card) {
      return;
    }
    const favorite = !card.favorite;
    this.cards.update((existing) =>
      existing.map((current) => (current.id === dashboardId ? { ...current, favorite } : current)),
    );
    await this.dashboardRepository.update(dashboardId, { favorite });
  }

  private async loadDashboards(): Promise<void> {
    const dashboards = await this.dashboardRepository.getAll();
    const cards = await Promise.all(
      dashboards.map(async (dashboard) => {
        const entries = await this.entryRepository.listByDashboard(dashboard.id);
        const mostRecentEntry = entries.reduce<Date | null>(
          (latest, entry) => (!latest || entry.createdAt > latest ? entry.createdAt : latest),
          null,
        );
        return {
          id: dashboard.id,
          name: dashboard.name,
          description: dashboard.description,
          icon: dashboard.icon,
          accent: dashboard.accent,
          favorite: dashboard.favorite,
          entryCount: entries.length,
          updatedLabel: mostRecentEntry ? formatRelativeTime(mostRecentEntry) : '—',
        } satisfies HomeDashboardCard;
      }),
    );
    this.cards.set(cards);
  }

  private async loadFirstName(): Promise<void> {
    const user = await this.currentUserService.getExisting();
    this.firstName.set(user?.name.trim().split(/\s+/)[0] ?? '');
  }
}
