import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { DashboardRepository } from '../../../database/repositories/dashboard.repository';
import { FieldRepository } from '../../../database/repositories/field.repository';
import { CreateDashboardService } from '../../../services/dashboard-create/create-dashboard.service';
import { CurrentUserService } from '../../../services/user/current-user.service';
import { hexWithAlpha } from '../../../core/utils/color.util';
import { Modal } from '../../../shared/components/modal/modal';
import { TextInput } from '../../../shared/components/text-input/text-input';
import { Textarea } from '../../../shared/components/textarea/textarea';
import { Button } from '../../../shared/components/button/button';
import { Icon } from '../../../shared/components/icon/icon';

interface DashboardDraft {
  name: string;
  icon: string;
  accent: string;
  description: string;
}

const ICON_OPTIONS = [
  'pool',
  'fitness_center',
  'savings',
  'directions_car',
  'home',
  'yard',
  'menu_book',
  'pets',
  'flight',
  'local_bar',
  'water_drop',
  'monitoring',
  'restaurant',
  'self_improvement',
];

const ACCENT_OPTIONS = [
  '#0FA6AE',
  '#5FA02A',
  '#2FD8E0',
  '#8DDB4C',
  '#1D8A8F',
  '#3E8A55',
  '#0B7A82',
  '#6E9187',
];

const DRAFT_ACCENT_WEAK_ALPHA = 0.14;

function defaultDraft(): DashboardDraft {
  return { name: '', icon: 'stacks', accent: ACCENT_OPTIONS[0], description: '' };
}

@Component({
  selector: 'app-create-dashboard-modal',
  imports: [Modal, TextInput, Textarea, Button, Icon],
  templateUrl: './create-dashboard-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDashboardModal {
  private readonly router = inject(Router);
  private readonly dashboardRepository = inject(DashboardRepository);
  private readonly fieldRepository = inject(FieldRepository);
  private readonly currentUserService = inject(CurrentUserService);
  protected readonly createDashboardService = inject(CreateDashboardService);

  protected readonly iconOptions = ICON_OPTIONS;
  protected readonly accentOptions = ACCENT_OPTIONS;
  protected readonly draft = signal<DashboardDraft>(defaultDraft());
  protected readonly submitting = signal(false);

  protected readonly draftIconBackground = computed(() =>
    hexWithAlpha(this.draft().accent, DRAFT_ACCENT_WEAK_ALPHA),
  );

  constructor() {
    effect(() => {
      if (this.createDashboardService.isOpen()) {
        this.draft.set(defaultDraft());
      }
    });
  }

  protected setName(name: string): void {
    this.draft.update((current) => ({ ...current, name }));
  }

  protected setDescription(description: string): void {
    this.draft.update((current) => ({ ...current, description }));
  }

  protected selectIcon(icon: string): void {
    this.draft.update((current) => ({ ...current, icon }));
  }

  protected selectAccent(accent: string): void {
    this.draft.update((current) => ({ ...current, accent }));
  }

  protected close(): void {
    this.createDashboardService.close();
  }

  protected async submit(): Promise<void> {
    if (this.submitting()) {
      return;
    }
    this.submitting.set(true);
    try {
      const draft = this.draft();
      const [user, existingDashboards] = await Promise.all([
        this.currentUserService.getOrCreate(),
        this.dashboardRepository.getAll(),
      ]);
      const dashboard = await this.dashboardRepository.create({
        userId: user.id,
        name: draft.name.trim() || 'Untitled dashboard',
        icon: draft.icon,
        accent: draft.accent,
        description: draft.description.trim(),
        sortOrder: existingDashboards.length,
        favorite: false,
      });
      await this.fieldRepository.create({
        dashboardId: dashboard.id,
        label: 'Date',
        type: 'date',
        sortOrder: 0,
        showAsWidget: false,
      });
      this.createDashboardService.close();
      await this.router.navigate(['/dashboards', dashboard.id, 'builder']);
    } finally {
      this.submitting.set(false);
    }
  }
}
