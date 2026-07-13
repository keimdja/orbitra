import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type BadgeVariant = 'accent' | 'danger';

const BASE_CLASSES = 'inline-flex items-center text-[11.5px] font-bold px-1.5 py-0.5 rounded-[7px]';

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  accent: 'bg-accent-weak text-accent',
  danger: 'bg-danger-weak text-danger',
};

@Component({
  selector: 'app-badge',
  templateUrl: './badge.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Badge {
  readonly variant = input<BadgeVariant>('accent');

  protected readonly classes = computed(() => `${BASE_CLASSES} ${VARIANT_CLASSES[this.variant()]}`);
}
